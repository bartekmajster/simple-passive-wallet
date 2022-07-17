import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Row } from 'simple-flexbox';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button, Spacer, Input, Heading, Text, Loader } from 'components/atoms';
import { paths } from 'routes/paths';
import { LangSelector } from 'components/molecules/LangSelector';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { useInput } from 'hooks/useInput';
import { AppDispatch } from 'store';
import { signInThunk } from 'store/thunks/auth/signInThunk';
import { selectSignInError, selectSignInStatus } from 'store/selectors/auth';
import { validationSchema } from './Login.schema';
import { StyledFullscreenClear, Wrapper, Form } from './Login.styles';

export const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const signInStatus = useSelector(selectSignInStatus);
  const errorMessage = useSelector(selectSignInError);

  const defaultValues = { userEmail: '', userPassword: '' };

  const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
    await dispatch(signInThunk({ userEmail, userPassword }));
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
    if (signInStatus === 'fulfilled') {
      navigate(paths.addModelPortfolio);
    }

    if (signInStatus === 'rejected') {
      setError('userEmail', { type: 'custom', message: errorMessage.message });
    }
  }, [signInStatus]);

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
    <StyledFullscreenClear
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper alignItems="stretch">
        <Heading textAlign="center">{t('sign_in')}</Heading>

        <Spacer space="small" />

        <Text
          fontSize="0.875"
          fontColor="darkGray"
          textAlign="center"
        >
          {t('page.login.description')}
        </Text>

        <Spacer space="large" />

        <Form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            placeholder={t('page.login.email.placeholder')}
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
      </Wrapper>

      <Spacer space="large" />

      <Spacer space="large" />

      <Spacer space="large" />

      <Row justifyContent="flex-end">
        <LangSelector />
      </Row>
    </StyledFullscreenClear>
  );
};
