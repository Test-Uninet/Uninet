import { GetStaticProps } from 'next';
import React from 'react';
import FilteredList from '@/component/filteredList';
import dummy from '@/dummy/dummy.json';

interface TaskPageProps {
  data: {
    status: number;
    message: string;
    data: {
      response: {
        billdetails: {
          adminfee?: string;
          billid?: string;
          currency?: string;
          tittle?: string;
          totalamount?: string;
          description?: null;
          body?: string[];
          billername?: string;
          inquiryid?: string;
          paymenttype?: string;
          responsemsg?: string;
          subscriberid?: string;
          subscribername?: string;
          trace?: {
            session_id: string;
            request_date_time: string;
            words: string;
            biller_id: string;
            account_number: string;
            systrace: number;
            Inquiry_id: string;
          };
          [key: string]: any;
        }[];
      };
    };
  };
}

const TaskPage: React.FC<TaskPageProps> = ({ data }) => {
  const sortedDenominations = dummy.data.response.billdetails
    .filter((item) => item.body && item.body[0]?.includes('DENOM'))
    .map((item) => parseInt(item.body![0].split(': ')[1]))
    .filter((denom) => denom >= 100000)
    .sort((a, b) => a - b);

  console.log("data", data);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Task Page</h1>
      <FilteredList beforeFilter={sortedDenominations} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<TaskPageProps> = async () => {
  try {
    const data: TaskPageProps['data'] = dummy;

    return {
      props: {
        data,
      },
    };
  } catch (error: any) {
    console.error('Error fetching data:', error.message);

    return {
      props: {
        data: {
          status: 0,
          message: 'Error fetching data',
          data: {
            response: {
              billdetails: [],
            },
          },
        },
      },
    };
  }
};

export default TaskPage;
