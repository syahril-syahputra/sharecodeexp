import LightButton from '@/components/Interface/Buttons/LightButton'
import { BaseModalXLarge } from '@/components/Interface/Modal/BaseModal'
import ContentTermAndCondition from './ContentTermAndCondition'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
export default function TermsandConditionofExportModal(props) {
  return (
    <BaseModalXLarge
      title={props.title || ''}
      classNameTitle={'text-indigo-900 font-semibold'}
      onClick={() => {
        props.setShowModal(false)
        if (props.modalBoolean == true) {
          props.acceptModal(true)
        }
        if (props.modalBoolean == false) {
          props.acceptModal(false)
        }
      }}
      body={
        <>
          <div className="text-justify space-y-6">
            <div>
              <p className="font-bold"> A. Limits on use of the Product</p>
              <ContentTermAndCondition
                content={
                  <>
                    The products offered by [Venatronics LLC. OR other EXEPART
                    entity], its subsidiaries, or affiliates ("Seller") are not
                    intended for and, by ordering them, you agree that they will
                    not be used in life support systems, human implantation,
                    nuclear facilities or systems, or any other application
                    where product failure could result in loss of life or
                    significant property damage. In the event of a breach of
                    this agreement, you agree to indemnify Seller and hold
                    Seller harmless against any loss, cost, or damage incurred
                    because of such breach.
                  </>
                }
              />
            </div>
            <div>
              <p className="font-bold"> B. Compliance with the law</p>
              <ContentTermAndCondition
                content={
                  <>
                    You acknowledge that the commodities, software, and/or
                    technology you purchase or receive from Seller may be
                    subject to export, re-export, or other restrictions under
                    the laws of the country of manufacture, the country of the
                    seller/distributor, and the country in which you reside.
                    Therefore, on behalf of yourself and your subsidiaries and
                    affiliates (collectively referred to as "Customer"), you
                    agree to comply with all applicable laws and regulations
                    regarding the export and re-export of such commodities,
                    software, and/or technology, as well as their direct
                    products related to goods obtained by Customer. In
                    particular:
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Customer understands that, according to 22 CFR 122 U.S.
                    International Traffic in Arms Regulation ("ITAR"), all
                    manufacturers, exporters, and brokers of U.S.-origin defense
                    articles, defense services, or related technical data
                    defined on the U.S. Munitions List (USML) must register with
                    the U.S. Department of State Directorate of Defense Trade
                    Controls (DDTC).
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Customer understands that U.S. origin commodities, software,
                    and/or technology exported from the U.S., as well as
                    foreign-manufactured products containing more than
                    de-minimis (i.e., 10%) U.S.-origin content, require U.S.
                    re-export authorization under the U.S. Export Administration
                    Regulations ("EAR"). In the case of re-export, Customer will
                    ensure that all necessary permissions, such as export
                    licenses and permits, are obtained by the exporter. This
                    also includes export authorizations for deemed exports (as
                    defined in EAR §734.2 and ITAR §120.17) to foreign
                    individuals. Furthermore, Customer understands that any
                    re-export of U.S.-origin ITAR controlled items or
                    foreign-produced end-items incorporating U.S.-origin ITAR
                    controlled components requires re-export authorization from
                    the U.S. Department of State DDTC.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Customer certifies that the commodities, software, and/or
                    technology will not be used, sold, re-exported, or
                    incorporated into products used directly or indirectly in
                    the design, development, production, stockpiling, or use of
                    chemical or biological weapons, nuclear programs, missiles,
                    and maritime nuclear propulsion projects unless authorized
                    under applicable laws and regulations concerning the
                    manufacture, export, and/or re-export of such items.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Customer certifies that the commodities, software, and/or
                    technology will not be used, sold, re-exported, or
                    incorporated into products for use by military, police, or
                    intelligence entities, space applications, or foreign
                    vessels or aircraft, unless authorized under applicable laws
                    and regulations concerning the manufacture, export, and/or
                    re-export of such items.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Customer certifies that the commodities, software, and/or
                    technology will not be used, sold, re-exported, or
                    incorporated into products for the benefit of individuals or
                    entities listed on any United States denied or restricted
                    party list, including the Entity List at Part 744 of the
                    Export Administration Regulations, individuals designated by
                    the U.S. government as Specially Designated Global
                    Terrorists (SDGTs), Specially Designated Terrorists (SDTs),
                    Foreign Terrorist Organizations (FTOs) on the Specially
                    Designated National (SDN) list, or any other relevant
                    government denied or restricted party list.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Customer certifies that the commodities, software, and/or
                    technology will not be exported or re-exported directly or
                    indirectly, diverted, or transshipped to or through any
                    country in violation of any United Nations, United States,
                    European Union, or other applicable embargo, nor shipped or
                    moved to a Free Trade Zone/Area unless authorized under
                    applicable laws and regulations.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Customer certifies that it is not an embassy, agency,
                    subdivision of, or otherwise affiliated with a non-U.S.
                    government.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Customer agrees that when requested by Seller, it will
                    provide Seller with an end-use/user statement in a form and
                    substance acceptable to Seller, certifying the intended use
                    of the relevant commodities, software, and/or technology.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Customer certifies that if it is unable to fulfill the
                    aforementioned certifications or if any of the information
                    provided in this document changes at any time, it will
                    notify Seller of the changes in writing before placing
                    further orders. This certification shall remain valid even
                    after the termination of the relationship between Customer
                    and Seller.
                  </>
                }
              />
            </div>
          </div>
        </>
      }
      action={
        <>
          {/* <LightButton
            className="font-bold uppercase mr-2"
            onClick={() => {
              props.setShowModal(false)
              if (props.modalBoolean == true) {
                props.acceptModal(false)
              }
              if (props.modalBoolean == false) {
                props.acceptModal(false)
              }
            }}
          >
            Decline
          </LightButton> */}
          <PrimaryButton
            className="font-bold uppercase"
            onClick={() => {
              props.setShowModal(false)
              if (props.modalBoolean == true) {
                props.acceptModal(true)
              }
              if (props.modalBoolean == false) {
                props.acceptModal(true)
              }
            }}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            I Accept
          </PrimaryButton>
        </>
      }
    ></BaseModalXLarge>
  )
}
