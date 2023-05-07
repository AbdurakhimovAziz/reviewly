import { useForm } from 'react-hook-form';
import { RegisterFormValues } from './types';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data); // You can handle the form submission here
  };

  return (
    <></>
    // <Form onSubmit={handleSubmit(onSubmit)} style={{ width: '500px' }}>
    //   <Stack direction="vertical" gap={4}>
    //     <Form.Group controlId="formUsername">
    //       <Form.Label>Username</Form.Label>
    //       <Form.Control
    //         type="text"
    //         {...register('username', { required: true })}
    //       />
    //       {errors.username && <span>This field is required</span>}
    //     </Form.Group>

    //     <Form.Group controlId="formEmail">
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control
    //         type="email"
    //         {...register('email', { required: true })}
    //       />
    //       {errors.email && <span>Please enter a valid email address</span>}
    //     </Form.Group>

    //     <Form.Group controlId="formPassword">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         {...register('password', { required: true })}
    //       />
    //       {errors.password && (
    //         <span>Password must be at least 6 characters long</span>
    //       )}
    //     </Form.Group>

    //     <div className="d-grid gap-2">
    //       <Button variant="primary" type="submit">
    //         Register
    //       </Button>
    //     </div>
    //   </Stack>
    // </Form>
  );
};
