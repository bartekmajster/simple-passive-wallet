import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button, Spacer, Input, Loader } from 'components/atoms';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { useInput } from 'hooks/useInput';
import { AppDispatch } from 'store';
import { signinThunk } from 'store/thunks/auth/signinThunk';
import { selectSigninError, selectSigninStatus } from 'store/selectors/auth';
import useRequest from 'hooks/useRequest';
import { signinCheckEmail, SigninCheckEmailResponse } from 'services/auth/signinCheckEmail';
import { validationSchema } from './Signin.schema';
import { Form } from './Signin.styles';

export const SigninForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const fetchSigninEmailCheck = () => signinCheckEmail({ userEmail: 'test@gmail.com' });

  const { request: checkEmail } = useRequest<SigninCheckEmailResponse>(fetchSigninEmailCheck, {
    errorToast: 'wyjabało sie',
  });

  const signinStatus = useSelector(selectSigninStatus);
  const errorMessage = useSelector(selectSigninError);

  const defaultValues = { userEmail: '', userPassword: '' };

  const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
    await dispatch(signinThunk({ userEmail, userPassword }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useUpdateEffect(() => {
    if (signinStatus === 'fulfilled') {
      navigate(ROUTES.DASHBOARD);
    }

    if (signinStatus === 'rejected') {
      setError('userEmail', { type: 'custom', message: errorMessage.message });
    }
  }, [signinStatus]);

  const userEmailProps = useInput<typeof defaultValues>({
    register,
    name: 'userEmail',
    errors,
  });

  const userPasswordProps = useInput<typeof defaultValues>({
    register,
    name: 'userPassword',
    errors,
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        placeholder={t('page.signin.email.placeholder')}
        type="email"
        {...userEmailProps}
      />

      <Spacer />

      <Input
        placeholder={t('password')}
        type="password"
        {...userPasswordProps}
      />

      <Spacer />

      <Button
        color="black"
        width="auto"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? <Loader color="white" /> : t('sign_in')}
      </Button>
    </Form>
  );
};
