import DangerButton from '@/components/Interface/Buttons/DangerButton';
import LightButton from '@/components/Interface/Buttons/LightButton';
import {BaseModalMedium} from '@/components/Interface/Modal/BaseModal';

export default function DeleteContributor(props) {
  return (
    <BaseModalMedium
      title="Delete Subscriber"
      onClick={() => props.onShowModal(false)}
      body={
        <>
          <p className="text-blueGray-500 text-lg leading-relaxed mb-4">
            Are you sure to delete{' '}
            <span className="text-blueGray-700 font-bold">
              {props.contributor.name}
            </span>{' '}
            as a Subscriber?
          </p>
        </>
      }
      action={
        <>
          <LightButton
            className="font-bold uppercase mr-2"
            onClick={() => props.onShowModal(false)}
          >
            No, Close
          </LightButton>

          <DangerButton
            disabled={props.isLoading}
            className="font-bold uppercase"
            onClick={() => props.onDelete(props.contributor.id)}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Yes, Delete
          </DangerButton>
        </>
      }
    ></BaseModalMedium>
  );
}
