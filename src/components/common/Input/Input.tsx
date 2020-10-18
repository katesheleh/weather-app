import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import classes from './Input.module.scss'

type InputPropsType
    = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { labelTitle?: string, error?: string }

const Input = (props: InputPropsType) => {

    const {labelTitle, error, ...restProps} = props

    return (
        <label className={classes.label}>
            {labelTitle && <span className={classes.label}>{labelTitle}</span>}
            <input {...restProps} type={props.type} className={`${classes.input} ${props.className}`}/>
            {
                error &&
                <div className={classes.error}>
                    <div className={classes.errorMessage}>{error}</div>
                </div>
            }
        </label>
    )
}

export default React.memo(Input)
