import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/data-access/common/configs/hooks';
import ErrorsForm from 'shared/data-ui/errors-form/ErrorsForm';
import { NewUser } from '../../shared/data-access/common/configs/appModels';
import Auth from '../Auth';
import { registerActions, selectRegisterErrors } from './registerSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(selectRegisterErrors);

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = useForm<NewUser>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<NewUser> = (data) => {
    dispatch(registerActions.begin(data));
  };

  useEffect(() => {
    return () => {
      dispatch(registerActions.resetError());
    };
  }, []);

  return (
    <Auth>
      <>
        <h1 className="text-xs-center">Sign up</h1>
        <p className="text-xs-center">
          <Link to="/login">Have an account?</Link>
        </p>

        <ErrorsForm errors={errors} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              {...register('username', { required: true })}
            />
          </fieldset>
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
            Sign up
          </button>
        </form>
      </>
    </Auth>
  );
};

export default Register;
