import DangerButton from "@/components/Interface/Buttons/DangerButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function DeleteUser(props){
    return(
        <BaseModalMedium
            title="Delete User"
            onClick={() => props.setShowModal(false)}
            body={
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Do you want to remove <span className="text-blueGray-700 font-bold">{props.item.name}</span> from user?
                </p>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        className="font-bold uppercase mr-2"
                        onClick={() => props.setShowModal(false)}
                    >
                        No, Close
                    </LightButton>
                    <DangerButton
                        disabled={props.isLoading}
                        className="font-bold uppercase"
                        onClick={() => props.acceptModal(props.item.id)}
                    >
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Yes, Remove
                    </DangerButton>
                </>
            }
        ></BaseModalMedium>
    )
}