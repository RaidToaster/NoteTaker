import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">

                <div className="relative h-96 md:h-auto">
                    <Image
                        src="/bg.jpg"
                        alt="Background"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                <div className="p-8 relative z-10 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                        Create Your Account!
                    </h1>
                    <SignUp appearance={{
                        elements: {
                            formButtonPrimary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
                            formFieldInput: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                            formFieldLabel: 'block text-gray-700 text-sm font-bold mb-2',
                            footerActionLink: 'inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800',
                            socialButtonsBlockButton: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center',
                            socialButtonsBlockButtonText: 'flex items-center justify-center space-x-2',
                            socialButtonsBlockButtonIcon: 'h-5 w-5',
                        },
                        variables: {
                            colorPrimary: '#3B82F6',
                            colorText: '#4B5563',
                            fontFamily: 'sans-serif',
                        }
                    }} />
                </div>
            </div>
        </div>
    );
}