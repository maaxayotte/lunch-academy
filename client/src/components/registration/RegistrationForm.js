import React, { useState } from 'react'
import FormError from '../layout/FormError'
import config from '../../config'


const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    firstName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const validateInput = (payload) => {
    setErrors({})
    const { firstName, email, password, passwordConfirmation } = payload
    const emailRegexp = config.validation.email.regexp
    let newErrors = {}
    
    if (firstName.trim() == '') {
      newErrors = {
        ...newErrors,
        name: 'is required',
      }
    }

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: 'is invalid',
      }
    }

    if (password.trim() == '') {
      newErrors = {
        ...newErrors,
        password: 'is required',
      }
    }

    if (passwordConfirmation.trim() === '') {
      newErrors = {
        ...newErrors,
        passwordConfirmation: 'is required',
      }
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: 'does not match password',
        }
      }
    }

    setErrors(newErrors)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    validateInput(userPayload)
    if (Object.keys(errors).length === 0) {
      fetch('/api/v1/users', {
        method: 'post',
        body: JSON.stringify(userPayload),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            setShouldRedirect(true)
          })
        } else {
          const errorMessage = `${resp.status} (${resp.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }  
      })
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = '/'
  }

  return (
    <div className='grid-container background-runner' onSubmit={onSubmit}>
      <div className='container main-container form-container'>
        <h1>Register.</h1>
        <form>
          <div>
            <label>
              Name
              <input 
                className='input' 
                type='text' 
                name='firstName' 
                value={userPayload.firstName} 
                onChange={onInputChange} 
              />
              <FormError error={errors.name} />
            </label>
          </div>
          <div>
            <label>
              Email
              <input 
                className='input' 
                type='text' 
                name='email' 
                value={userPayload.email} 
                onChange={onInputChange} 
              />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                className='input'
                type='password'
                name='password'
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <label>
              Password Confirmation
              <input
                className='input'
                type='password'
                name='passwordConfirmation'
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div className='btn-div'>
            <input 
              type='submit' 
              className='btn btn-primary' 
              value='Register' 
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
