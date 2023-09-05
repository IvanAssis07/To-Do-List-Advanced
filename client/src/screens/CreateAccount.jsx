import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  MenuItem,
  TextField,
  Box,
  Button,
  Typography,
  Paper,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  Card,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { MessageModal } from '../components/MessageModal';
import { Loading } from '../components/Loading';

export const CreateAccount = () => {
  const adapter = new AdapterDayjs();
  const navigate = useNavigate();

  const [missingPhotoMsg, setMissingPhotoMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    sex: '',
    company: '',
    photo: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.photo === '') {
      setIsLoading(false);
      setMissingPhotoMsg(true);
      return;
    }

    Meteor.call(
      'users.insert',
      {
        name: formData.name,
        email: formData.email,
        birthDate: formData.birthDate.toDate(),
        sex: formData.sex,
        company: formData.company,
        photo: formData.photo,
        password: formData.password,
      }, (error) => {
        if (error) {
          setIsLoading(false);
          setErrorState(true);
        } else {
          setIsLoading(false);
          setSuccessMsg(true);
        }
      }
    );
  };

  const handlePhotoChange = (file) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result;
        setFormData({ ...formData, photo: base64 });
      };

      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, photo: '' });
    }
  };

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        fontWeight: 'bold',
      }}
    >
      <Paper
        elevation={24}
        sx={{
          padding: 5,
          paddingTop: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography marginBottom={2} variant='h3' component='h1'>
            Create your Account
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='off'
            autoFocus
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <DatePicker
            isRequired
            sx={{ width: '100%', marginBottom: 2, marginTop: 2 }}
            label='Birth date'
            format='DD/MM/YYYY'
            value={adapter.date(formData.birthDate)}
            onChange={(deadline) =>
              setFormData({ ...formData, birthDate: deadline })
            }
          />
          <Box>
            <FormControl fullWidth required margin='normal'>
              <InputLabel id='sex'>Sex</InputLabel>
              <Select
                labelId='sex'
                label='Sex'
                id='sex'
                value={formData.sex || ''}
                onChange={(e) =>
                  setFormData({ ...formData, sex: e.target.value })
                }
              >
                <MenuItem id={'Feminine'} value={'Feminine'}>
                  Feminine
                </MenuItem>
                <MenuItem id={'Masculine'} value={'Masculine'}>
                  Masculine
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            margin='normal'
            required
            fullWidth
            name='company'
            label='Company'
            id='company'
            autoComplete='off'
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='off'
            autoFocus
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            type='password'
            label='Password'
            name='password'
            autoComplete='off'
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Card sx={{ paddingY: 2 }}>
            {formData.photo && (
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                paddingY={2}
              >
                <Avatar
                  alt='Profile pic'
                  src={formData.photo}
                  sx={{
                    width: 150,
                    height: 150,
                    border: 'solid',
                    borderColor: '#1976d2',
                  }}
                />
              </Box>
            )}
            <label htmlFor='upload-image'>
              <Button variant='contained' component='span'>
                Upload profile photo
              </Button>
              <input
                id='upload-image'
                hidden
                accept='image/*'
                type='file'
                onChange={(e) => handlePhotoChange(e.target.files[0])}
              />
            </label>
          </Card>
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{
              marginTop: 4,
            }}
          >
            Create
          </Button>
        </form>
      </Paper>
      {missingPhotoMsg && 
        <MessageModal
          title='Atenção'
          message='A foto é obrigatória.'
          hasCancelButton={false}
          handleConfirmationButton={() => {
            setMissingPhotoMsg(false);
          }}          
        />
      }
      {errorState && 
        <MessageModal
          title='Atenção'
          message='Houve um erro na criação da conta, tente novamente.'
          hasCancelButton={false}
          handleConfirmationButton={() => {
            setErrorState(false);
          }}          
        />
      }
      {successMsg &&
        <MessageModal
          title='Parabéns'
          message='Conta criada com sucesso.'
          hasCancelButton={false}
          handleConfirmationButton={() => {
            navigate('/');
          }}          
        />
      }
    </Box>
  );
};
