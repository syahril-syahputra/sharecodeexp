import {useState} from 'react';
import Link from 'next/link';
import {getSession} from 'next-auth/react';
import axios from '@/lib/axios';

import PageHeader from '@/components/Interface/Page/PageHeader';
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper';
import LightButton from '@/components/Interface/Buttons/LightButton';

// layout for page
import Admin from 'layouts/Admin.js';
import DangerNotification from '@/components/Interface/Notification/DangerNotification';
import TextInput from '@/components/Interface/Form/TextInput';
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton';
import {toast} from 'react-toastify';
import {toastOptions} from '@/lib/toastOptions';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import SelectInput from '@/components/Interface/Form/SelectInput';
import StatusUpdateOngoingOrder from '@/components/Dashboard/Superadmin/StatusUpdateOngoingOrder';
import {useRoleStatus} from '@/domain/states/user_control/vendor/hook';

export default function CreateContributor({session}) {
  const [isLoading, setIsLoading] = useState(false);
  const [stateStatus, loading] = useRoleStatus();
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_status: '',
  });
  const setDataHandler = (input) => {
    setInputData({...inputData, [input.name]: input.value});
  };
  const [errorInfo, setErrorInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const statusOptions = stateStatus;
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorInfo({});
    setErrorMessage(null);
    const response = await axios
      .post(`/admin/contributors/create`, inputData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => {
        router.push('/admin/superadmin/usercontrol/contributors');
        toast.success(
          'Your contributor have been created successfully.',
          toastOptions
        );
      })
      .catch((error) => {
        toast.error('Something went wrong.', toastOptions);
        setErrorMessage('Please fill your form correctly');
        setErrorInfo(error.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // this function for handleStausChange
  const [stateStatusRole, setStateStatusRole] = useState(null);
  const handleStatusChange = (value) => {
    setStateStatusRole(value);
    setInputData({...inputData, role_status: value.value});
  };

  return (
    <PrimaryWrapper>
      <PageHeader
        leftTop={
          <h3 className="font-semibold text-lg text-blueGray-700">
            {/* Create Contributor */}
            Create Subscriber
          </h3>
        }
        rightTop={
          <Link href={`/admin/superadmin/usercontrol/contributors`}>
            <LightButton size="sm">
              <i className="mr-2 ml-1 fas fa-arrow-left"></i>
              Back
            </LightButton>
          </Link>
        }
      ></PageHeader>

      {errorMessage && <DangerNotification message={errorMessage} />}

      <form onSubmit={handleSubmit} className="pl-1 mt-6">
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <TextInput
            disabled={isLoading}
            required
            label="Name"
            name="name"
            value={inputData.name}
            onChange={(input) => setDataHandler(input)}
            errorMsg={errorInfo?.name}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <TextInput
            disabled={isLoading}
            required
            label="Email"
            type="email"
            name="email"
            value={inputData.email}
            onChange={(input) => setDataHandler(input)}
            errorMsg={errorInfo?.email}
          />
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <div className="relative">
            <TextInput
              disabled={isLoading}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              name="password"
              value={inputData.password}
              errorMsg={errorInfo?.password}
              onChange={(input) => setDataHandler(input)}
            />
            <div
              className="absolute inset-y-3 right-4 top-9 flex items-start cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash text-slate-500"></i>
              ) : (
                <i className="fas fa-eye text-slate-500"></i>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-6">
          <div className="relative">
            <TextInput
              label="Confirm Password"
              type={showConfirmationPassword ? 'text' : 'password'}
              required
              name="password_confirmation"
              value={inputData.password_confirmation}
              errorMsg={errorInfo?.password_confirmation}
              onChange={(input) => setDataHandler(input)}
            />
            <div
              className="absolute inset-y-3 right-4 top-9 flex items-start cursor-pointer"
              onClick={() => setShowConfirmationPassword((prev) => !prev)}
            >
              {showConfirmationPassword ? (
                <i className="fas fa-eye-slash text-slate-500"></i>
              ) : (
                <i className="fas fa-eye text-slate-500"></i>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-3 mb-10">
          <div className="relative">
            <SelectInput
              searchable
              label="Status"
              name="stateStatusRole"
              value={stateStatusRole}
              required
              options={statusOptions}
              errorMsg={errorInfo?.role_status}
              onChange={handleStatusChange}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-3 mb-6">
          <Link href={`/admin/superadmin/usercontrol/contributors`}>
            <LightButton
              className="w-full font-bold uppercase mb-2"
              disabled={isLoading}
            >
              Cancel
            </LightButton>
          </Link>
          <PrimaryButton
            className="w-full font-bold uppercase"
            disabled={isLoading}
            type="submit"
          >
            {isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Create
          </PrimaryButton>
        </div>
      </form>
    </PrimaryWrapper>
  );
}

CreateContributor.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}
