const FormError = ({ errors, name }) => {
    return (
        <div>
            {
                errors[name]?.type === "required" && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {name} is required!</p>
            }

            {
                errors[name]?.type === "pattern" && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {name} is invalid!</p>
            }

            {
                errors[name]?.type === "min" && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {name} is invalid!</p>
            }
        </div>
    );
};

export default FormError;