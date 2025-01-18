import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const CheckOutForm = ({ donationAmount }) => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (donationAmount > 0) {
      axiosPublic.post('/create-payment-intent', { amount: donationAmount * 100 }) // Stripe expects the amount in cents
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error("Error creating payment intent:", err);
        });
    }
  }, [axiosPublic, donationAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (donationAmount <= 0 || isNaN(donationAmount)) {
      console.error("Invalid donation amount:", donationAmount);
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to donate $${donationAmount}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, donate it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!stripe || !elements) {
          return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
          return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });

        if (error) {
          console.log("Payment Error", error);
          setError(error.message);
          return;
        } else {
          console.log("Payment Method", paymentMethod);
          setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || 'anonymous',
              name: user?.displayName || 'anonymous',
            },
          },
        });

        if (confirmError) {
          console.log('Confirm error:', confirmError);
          setError(confirmError.message);
          return;
        }

        if (paymentIntent?.status === "succeeded") {
          console.log('Transaction ID:', paymentIntent.id);
          setTransactionId(paymentIntent.id);

          // Save payment in the database
          const payment = {
            email: user.email,
            price: donationAmount,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: 'pending',
          };

          try {
            const res = await axiosPublic.post('/payments', payment);
            console.log("Payment Save:", res.data);
            if (res?.data?.paymentResult?.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment Was Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              
            }
          } catch (saveError) {
            console.error("Error saving payment:", saveError);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Payment Failed",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-sm btn-primary my-4' type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
      {transactionId && <p className='text-green-600'>Your Transaction Id: {transactionId}</p>}
    </form>
  );
};

export default CheckOutForm;
