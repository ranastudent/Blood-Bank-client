import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import animationData from '../../../assets/Register - 1735973311447.json'
import Lottie from 'react-lottie';

const ContactMe = () => {
      const form = useRef();

      const sendEmail = (e) => {
            e.preventDefault();
            emailjs
                  .sendForm('service_95k6vne', 'template_p3aqiuu', form.current, { publicKey: 'WuKq00VDp11pXrcPH' })
                  .then(
                        () => {
                              console.log('SUCCESS!');
                        },
                        (error) => {
                              console.log('FAILED...', error.text);
                        }
                  );
      };
      const defaultOptions =
      {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
      };

      return (
            <div id='contact' className="max-w-md mx-auto p-4">
                  <h2 className="text-4xl text-center underline mb-4">Contact Us</h2>
                  <div className="flex justify-center mb-4"> <Lottie options={defaultOptions} height={100} width={100} /> </div>
                  <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <div>
                              <label className="block text-sm font-medium text-gray-700">Name</label>
                              <input type="text" name="from_name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                              <label className="block text-sm font-medium text-gray-700">Email</label>
                              <input type="email" name="from_email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                              <label className="block text-sm font-medium text-gray-700">Message</label>
                              <textarea name="message" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                              <input type="submit" value="Submit" className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                        </div>
                  </form>
                  <div>
                        <p className='text-2xl text-center'><span className='text-red-400'>Contact Num: </span>08812334545</p>
                  </div>
            </div>
      );
};

export default ContactMe;
