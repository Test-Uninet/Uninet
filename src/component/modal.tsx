import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { addBrand, brandCollection, updateBrand } from '@/config/controller';
import { BrandSchema, NewBrandType } from '@/interface/brand';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export default function FormDialog({ open, data, onclose }: {
  open: boolean,
  data: NewBrandType | undefined,
  onclose: () => void
}) {

  const router = useRouter()
  const queryClient = useQueryClient();
  const [popupAdd, setPopupAdd] = React.useState<boolean>(false);
  const [popupEdit, setPopupEdit] = React.useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      Brand: '',
      Description: '',
      Price: 0,
    },
    resolver: yupResolver(BrandSchema),
    mode: 'onBlur',
    shouldFocusError: true,
  });


  const onSubmit = (newdata: any) => {
    if (data) {
      updateBrand(
        data.Id,
        newdata
      );
    }
    else {
      addBrand(newdata)

    };
    console.log(data)
  }
  
  useEffect(() => {
    if(data){
    setValue("Brand", data.Brand)
    setValue("Description", data.Description)
    setValue("Price", data.Price)
    }
  }, [data])
  

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onclose}>
        <DialogTitle>{data ? "Edit" : "Add"} Category</DialogTitle>
        <DialogContent>
          <div className="w-[40vw] h-[50vh] flex flex-col items-center justify-center">
            <div className="text-[24px] text-center font-semibold my-2">
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-auto mt-5">
                <TextField
                  label="Brand"
                  variant="outlined"
                  fullWidth
                  className={`border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.Brand ? 'border-red-500' : ''}`}
                  {...register('Brand')}
                />
                {errors.Brand && <p className="text-red-500 text-sm">{errors.Brand.message}</p>}
              </div>
              <div className="mx-auto mt-5">
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  className={`border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.Description ? 'border-red-500' : ''}`}
                  {...register('Description')}
                />
                {errors.Description && <p className="text-red-500 text-sm">{errors.Description.message}</p>}
              </div>
              <div className="mx-auto mt-5">
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  className={`border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.Price ? 'border-red-500' : ''}`}
                  {...register('Price')}
                />
                {errors.Price && <p className="text-red-500 text-sm">{errors.Price.message}</p>}
              </div>
              <Button type="submit" className='bg-blue-950 relative px-8 py-2 my-3 rounded-xl text-black'>
                Save
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
