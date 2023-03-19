import React from 'react'
import VerifyCodeForm from './../../features/authentication/components/VerifyCodeForm';
import RegistrationCard from './../../features/authentication/components/RegistrationCard';
import VerifyCode from './../forgot-password/verify-code';
import { NextPageWithLayout } from 'types';

const Verify: NextPageWithLayout = () => {
  return (
    <VerifyCode />
  )
}
Verify.mainLayoutProps = {
  title: "Talents Valley Verification",
  pageDescription: "Verification page description",
};

export default Verify