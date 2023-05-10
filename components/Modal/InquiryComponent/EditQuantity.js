import { useState } from "react";
import InputForm from "@/components/Shared/InputForm";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import TextInput from "@/components/Interface/Form/TextInput";
import NumberInput from "@/components/Interface/Form/NumberInput";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
export default function Modal(props) {
  const [orderQty, setOrderQty] = useState(props.orderQuantity)
  const handleEditQty = () => {
    props.acceptModal(orderQty)
  }

  return (
    <BaseModalMedium
      title="Edit Quantity"
      onClick={() => props.setShowModal(false)}
      body={
        <>
          <p className="text-blueGray-500 text-lg leading-relaxed mb-6">
            Edit Quantity of Manufacture Part Number <span className="text-blueGray-700 font-bold">{props.title}</span>
          </p>
          <div className="flex flex-wrap mb-6">
              <div className="w-full">
                <NumberInput
                  label="QTY(s)"
                  name="qty"
                  value={orderQty}
                  onChange={(input) => setOrderQty(input.value)}
                  errorMsg={props.errorMsg}
                />
              </div>
          </div>
        </>
      }
      action={
        <>
          <LightButton
            disabled={props.isLoading}
            className="font-bold uppercase mr-2"
            onClick={() => props.setShowModal(false)}
          >
            Close
          </LightButton>
          <WarningButton
            disabled={props.isLoading}
            className="font-bold uppercase"
            onClick={handleEditQty}
          >
            {props.isLoading &&
                <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            }
            Edit
          </WarningButton>
        </>
      }
    ></BaseModalMedium>
  );
}