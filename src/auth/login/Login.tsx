import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import ErrorsForm from 'shared/data-ui/errors-form/ErrorsForm';
import { LoginUser } from '../../shared/data-access/common/configs/appModels';
import Auth from '../Auth';
import { loginActions, selectLoginErrors } from './loginSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(selectLoginErrors);

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = useForm<LoginUser>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    dispatch(loginActions.begin(data));
  };

  useEffect(() => {
    return () => {
      dispatch(loginActions.resetError());
    };
  }, []);

  return (
    <Auth>
      <>
        <h1 className="text-xs-center">Sign in</h1>
        <p className="text-xs-center">
          <Link to="/register">Need an account?</Link>
        </p>

        <ErrorsForm errors={errors} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Email"
              {...register('email', { required: true })}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
          </fieldset>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            disabled={!isValid || isSubmitting}
          >
            Sign in
          </button>
        </form>
      </>
    </Auth>
  );
};

export default Login;
