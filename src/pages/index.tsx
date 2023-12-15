import AnimatedPage from '@/component/animatedPage';
import { useRouter } from 'next/navigation';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@/component/button';
import Layout from '@/component/layout';
import Modal from '@/component/modal';
import { Box } from '@mui/material';
import { NewBrandType } from '@/interface/brand';
import React, { useEffect, useState } from 'react';
import { DocumentData, QuerySnapshot, doc, onSnapshot, snapshotEqual } from 'firebase/firestore';
import { brandCollection } from '@/config/controller';

const Dashboard = () => {
    const router = useRouter()
    const [selectedRow, setSelectedRow] = useState()
    const [dataEdit, setDataEdit] = React.useState<NewBrandType>();
    const [popupEdit, setPopupEdit] = React.useState<boolean>(false);
    const [brand, setBrand] = useState<NewBrandType[]>([]);

    const AddCategory = () => {
        setPopupEdit(!popupEdit);
    };

    const EditCategory = () => {

        setPopupEdit(!popupEdit);

    };

    const handleAction = (data: NewBrandType, action: 'edit' | 'delete') => {
        if (action === 'edit') {

            setDataEdit(data)
            EditCategory();
        } else if (action === 'delete') {
            const updatedRows = brand.filter(brand => brand.Id !== data.Id);
            setBrand(updatedRows);
        }
    };
    const columns: GridColDef[] = [
        { field: 'Id', headerName: 'ID', width: 70, renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.Id) + 1 },
        { field: 'Brand', headerName: 'Brand', width: 250 },
        { field: 'Description', headerName: 'Description', width: 250 },
        { field: 'Price', headerName: 'Price', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,

            headerClassName: 'action',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            renderCell: (params) => (
                <Box display="flex" mx="auto" ml="auto">
                    <Button onClick={() => handleAction(params.row, 'edit')} className='bg-yellow-500 ml-auto p-2 rounded-xl'>
                        Edit
                    </Button>
                    <Button onClick={() => handleAction(params.row, 'delete')} className='bg-red-500 p-2 rounded-xl mx-5'>
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        onSnapshot(brandCollection, (snapshot: QuerySnapshot<DocumentData>) => {
            const a: any = snapshot.docs.map((doc) => ({
                Id: doc.id,
                ...doc.data()
            }))
            return setBrand(a);
        });
    }, []);


    console.log(brand, "Brand");

    return (
        <>
            <Layout>
                <Modal
                    open={popupEdit}
                    data={dataEdit}
                    onclose={() => setPopupEdit(false)} />
                <div className=" w-full h-full">
                    <AnimatedPage>
                        <div className=" h-full w-full bg-white">
                            <div className="p-5 text-white flex flex-row justify-between ">
                                <h1 className="font-semibold text-lg text-black underline underline-offset-8">
                                    My Brand
                                </h1>
                                <Button className='justify-between bg-green-500 p-3 rounded-xl'
                                    onClick={AddCategory}>
                                    Add Category
                                </Button>
                            </div>
                            <div style={{ width: '100%' }}>
                                <DataGrid
                                    className=' w-full'
                                    getRowId={(row) => row.Id}
                                    rows={brand}
                                    columns={columns}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                />
                            </div>
                        </div>
                    </AnimatedPage>
                </div>
            </Layout>
        </>
    );
};

export default Dashboard;
