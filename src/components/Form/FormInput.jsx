import FormError from './FormError';
import { Input } from '../ui/input';
import * as React from "react"


const FormInput = React.forwardRef(({ name, type, errors, ...props }, ref) => {
    return (
        <>
            <Input
                id={name}
                type={type}
                className={errors[name] && 'border-red-600 bg-red-100'}
                ref={ref}
                {...props}
            />
            <FormError name={name} errors={errors}></FormError>
        </>
    );
})
FormInput.displayName = "FormInput"

export default FormInput;