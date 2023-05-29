import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
export default function Logout(props){
    return (
        <>
            <BaseModalMedium
                title="Logout"
                onClick={() => props.closeModal()}
                body={
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Do you want to <span className="text-blueGray-700 font-bold">Logout</span>?
                    </p>
                }
                action={
                    <>
                        <LightButton
                            className="uppercase mr-2"
                            onClick={() => props.closeModal()}
                        >
                            No, Stay
                        </LightButton>

                        <PrimaryButton
                            className="uppercase"
                            isLoading={props.isLoading}
                            onClick={() => props.acceptance()}
                        >Yes, Logout</PrimaryButton>
                    </>
                }
            />
        </>
    )
}


