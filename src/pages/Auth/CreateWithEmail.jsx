import React, { useEffect, useState } from 'react'
import BackIcon from '/icons/backicon.svg'
import RoundedButton from '/src/components/RoundedButton.jsx'
import RoundedInput from '../../components/RoundedInput'
import RoundedTextArea from '../../components/RoundedTextArea'
import { toast } from 'react-toastify'
import { Status } from '../../Global'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils'
import { accountApi } from '../../api/account'

export default function CreateWithEmail(props) {

  const { isActive, userBasicInfo, setUserBasicInfo, goToStep, setLoadingView } = props;

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (isActive) {
      setEmailError('');
      setPasswordError('');
      setUserBasicInfo({
        ...userBasicInfo,
        email: '',
        password: ''
      });
    }
  }, [isActive])

  const onChangeEmail = e => {
    setUserBasicInfo({
      ...userBasicInfo,
      email: e.target.value,
    })
  }

  const onChangePassword = e => {
    setUserBasicInfo({
      ...userBasicInfo,
      password: e.target.value
    })
  }

  const onChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  }

  const clickCreateAccount = async () => {
    if (userBasicInfo.email == '') {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(userBasicInfo.email)) {
      setEmailError('Email is invalid');
      return;
    }

    if (userBasicInfo.password == '') {
      setPasswordError('Password is required');
      return;
    }

    setLoadingView(true);
    try {
      const resp = await accountApi.checkEmail(userBasicInfo.email);
      console.log('resp >>> ', resp);
      if (resp.checkResult.status == 'fail') {
        setEmailError(resp.checkResult.message);
      } else {
        goToStep(Status.CreateProfile1);
      }
    } catch (err) {
      toast.error(err);
    }
    setLoadingView(false);
  }

  return (
    <div className='flex flex-row sm:h-[516px]'>
      <div className='h-full hidden sm:block mr-10 items-start'>
        <RoundedButton width={'w-[48px]'} height={'h-[48px]'} clickFunc={() => goToStep(Status.Signup)}>
          <span><img src={BackIcon}></img></span>
        </RoundedButton>
      </div>
      <div className='flex flex-col items-center justify-center px-5 sm:px-0'>
        <h2 className='text-primary text-[24px] font-bold grow-0'>Create your account</h2>
        <h2 className='text-desc text-base mt-2 sm:mt-4 grow-0 px-4 w-full sm:px-12 text-center'>Enter your email and password to create your Trooper account.</h2>
        <div className='flex flex-col justify-center items-start w-full grow-0 mt-4 gap-1 sm:px-10 px-2'>
          <h2 className='text-desc text-base mt-1 grow-0 px-7'>Email</h2>
          <RoundedInput
            margin={'mt-1'}
            width={'w-full'}
            padding={'px-5 py-2'}
            attrib={'text-sm text-primary bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'}
            placeholder={'Enter your email'}
            inputValue={userBasicInfo.email}
            onChangeInput={onChangeEmail}
            type={'email'}>
          </RoundedInput>
          {emailError != "" && (<h2 className='text-red-500 text-[14px] mt-1 grow-0 px-7'>{emailError}</h2>)}
        </div>
        <div className='flex flex-col justify-center items-start w-full grow-0 mt-3 gap-1 sm:px-10 px-2'>
          <h2 className='text-desc text-base mt-1 grow-0 px-7'>Password</h2>
          <RoundedInput
            margin={'mt-1'}
            width={'w-full'}
            padding={'px-5 py-2'}
            attrib={'text-sm text-primary bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'}
            placeholder={'Enter your password'}
            inputValue={userBasicInfo.password}
            onChangeInput={onChangePassword}
            type={'password'}>
          </RoundedInput>
          {passwordError != "" && (<h2 className='text-red-500 text-[14px] mt-1 grow-0 px-7'>{passwordError}</h2>)}
        </div>
        {/* <div className='flex flex-col justify-center items-start w-full grow-0 mt-1 gap-1 sm:px-10 px-2'>
          <h2 className='text-desc text-base mt-1 grow-0 px-7'>Confirm Password</h2>
          <RoundedInput 
            margin={'mt-1'} 
            width={'w-full'} 
            padding={'px-5 py-2'} 
            attrib={'text-sm bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'} 
            placeholder={'Confirm your password'} 
            inputValue={confirmPassword} 
            onChangeInput={onChangeConfirmPassword}
            type={'password'}>
          </RoundedInput>
        </div> */}
        {/* <div className='flex flex-col justify-center items-start w-full grow-0 mt-2'>
          <h2 className='text-desc text-base mt-3 grow-0 ml-7'>Description</h2>
          <RoundedTextArea width={'w-full'} height={'h-36'} padding={'px-4 py-4'} parentAttrib={'!rounded-3xl'} attrib={'border-transparent resize-none text-sm bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0'} placeholder={'Tell us more about yourself...'} textAreaValue={userDetail.desc} onChangeTextArea={onChangeDesc}>
          </RoundedTextArea>
        </div> */}

        <div className='grow hidden sm:block'></div>
        <div className='w-full sm:px-10 px-2'>
          <RoundedButton width={'w-full'} height={'h-[54px]'} attrib={'grow-0 mt-8 sm:mt-0'} clickFunc={clickCreateAccount}>
            Create account
          </RoundedButton>
        </div>
        <div className='flex flex-row mt-4 sm:ml-8 w-full'>
          <p className='text-primary text-center w-full mr-1'>
            By signing up, you agree to the&nbsp;
            <Link to="/privacy-policy">
              <span className='text-small underline underline-offset-1'>Terms of Service</span>
            </Link>
            &nbsp;and Data Processing Agreement.
          </p>
          <RoundedButton width={'w-[90px]'} height={'h-[38px]'} attrib={'hidden sm:block text-base'} clickFunc={() => goToStep(Status.Signin)}>
            Sign In
          </RoundedButton>
        </div>

      </div >
    </div >
  )
}
