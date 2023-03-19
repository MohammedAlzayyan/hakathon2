import React from 'react'
import { TransferCard } from 'features/withdraw'
import { Button, Image } from 'components'
import Modal from 'components/Modal'
import { useState } from 'react';
import { VerifyCodeForm } from 'features/authentication';

function Opt() {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Open dialog
                </button>
            </div>

            {/* <Modal closeModal={closeModal} openModal={openModal} isOpen={isOpen}>
                <TransferCard title="We need to make sure its you!" closeModal={closeModal}>
                </TransferCard>
            </Modal> */}

            <Modal closeModal={closeModal} openModal={openModal} isOpen={isOpen}>
                <TransferCard centerTitle={true} title="We need to make sure its you!" closeModal={closeModal}>
                    <Image src="/assets/img/phone.png" alt="phone image" width={60} height={20} className='mx-auto mb-10' />

                    <div>
                        <p className="text-sm text-gray-dark mb-4 sm:mx-2">
                            We have sent you an email that contains a code to reset your password
                        </p>
                        <VerifyCodeForm />
                        {/* <Button fullWidth={true} onClick={closeModal}>Confirm</Button> */}
                    </div>
                </TransferCard>
            </Modal>
        </>

    )
}
export default Opt;