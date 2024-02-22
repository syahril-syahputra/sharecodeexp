import LightButton from '@/components/Interface/Buttons/LightButton'
import { BaseModalXLarge } from '@/components/Interface/Modal/BaseModal'
import ContentTermAndCondition from './ContentTermAndCondition'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { useState } from 'react'
export default function TermAndConditionOfSaleModal(props) {
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
          <h2 className="font-semibold text-lg text-center">
            Exhibit D: Terms and Conditions of Sale
          </h2>
          <div className="text-justify space-y-6">
            <ContentTermAndCondition
              content={
                <>
                  These Terms and Conditions of Sale govern the agreement
                  between Venatronics LLC/Exepart Electronics, its subsidiaries,
                  or affiliates (referred to as "Seller") and Exepart's
                  customers (referred to as "Customers") from the stock owner
                  manufacturers ("Sources") for the sale of products
                  ("Products"). These terms and conditions constitute the sole
                  agreement regarding the sale of products, superseding all
                  previous proposals, negotiations, conversations, discussions,
                  agreements, and representations, whether oral or written,
                  including any industry customs or past dealings between the
                  parties relating to the sale of products.
                </>
              }
            />
            <ContentTermAndCondition
              content={
                <>
                  The availability and pricing displayed on the website are an
                  invitation for the Customer to submit an offer. Responses to
                  quotes and other inquiries for pricing and availability do not
                  constitute an offer from Seller. Acceptance of an offer will
                  be in writing, either through an Order Confirmation email or
                  Electronic Data Interchange (EDI) acknowledgement. Acceptance
                  may also occur through the execution of the Customer's order
                  by Seller. It is important to note that when a customer places
                  an order through Seller’s website, the preliminary written
                  reply on the website does not indicate acceptance of the
                  order.
                </>
              }
            />
            <ContentTermAndCondition
              content={
                <>
                  Unless otherwise specified on the Seller's invoice or
                  acknowledgment, payment terms are TT advance for Customers and
                  net 30 for Sources to ensure the safety of both Sources and
                  Customers. Prices are EXW Seller's facility (INCOTERMS 2010)
                  for Customers and do not include taxes, freight, handling,
                  duty, or similar charges, which are the sole responsibility of
                  the Customer. Sources will be responsible for delivering their
                  products to the designated courier appointed by Seller for
                  shipment to the nearest Seller's affiliate. Prices are
                  contingent upon timely payment by the Customer, and any
                  overdue balance will accrue interest at a monthly rate of one
                  and a half percent. Freight charges may be estimated based on
                  standard carrier tariffs and may not reflect actual
                  transportation costs. Seller reserves the right to modify
                  terms prior to shipment, request payment in advance, or
                  delay/cancel any shipment or order if the Customer's
                  creditworthiness is in question or if the Customer fails to
                  fulfill obligations on time.
                </>
              }
            />
            <ContentTermAndCondition
              content={
                <>
                  {' '}
                  If no prior carrier selection is in place for shipping, the
                  Seller may choose a carrier. The Seller's responsibility for
                  loss or damage ceases, and title passes, upon delivery of the
                  products to the carrier, Customer, or Customer's agent
                  (including test houses or value-added service providers),
                  whichever occurs first. If the Seller holds products at the
                  Customer's request for rescheduled delivery or further
                  instructions, the Customer will be responsible for storage
                  charges.
                </>
              }
            />
            <ContentTermAndCondition
              content={
                <>
                  {' '}
                  Seller agrees to transfer any transferable warranties received
                  from the Source of the Products to the Customer. Seller
                  provides no other warranties, express or implied, regarding
                  the Products. Specifically, Seller provides no warranty
                  regarding the merchantability of the Products or their
                  suitability or fitness for any particular purpose or use, or
                  with respect to infringement.
                </>
              }
            />
            <ContentTermAndCondition
              content={
                <>
                  {' '}
                  Seller's liability arising from the sale of products to the
                  Customer is expressly limited to either (1) refunding the
                  purchase price paid by the Customer for such Products (without
                  interest), or (2) repairing and/or replacing such Products, at
                  Seller's discretion. These remedies are exclusive and exclude
                  all others. The Customer must notify Seller of any defective
                  product within 90 days from the date of shipment. This
                  warranty excludes all other warranties, whether oral, written,
                  expressed, implied, or statutory. Implied warranties of
                  fitness for a particular purpose and merchantability are
                  specifically excluded and do not apply. The Customer's
                  obligations and Seller's remedies regarding defective or
                  nonconforming products are solely as stated in these terms and
                  conditions. Furthermore, no warranty will apply if the Product
                  has been subject to misuse, static discharge, neglect,
                  accident, modification, soldering, or alteration in any way.
                </>
              }
            />
            <ContentTermAndCondition
              content={
                <>
                  {' '}
                  The Customer's exclusive remedy under these warranties is
                  limited to refund, repair, or replacement as determined by the
                  Seller. The Seller assumes no responsibility or liability for
                  manufacturer's product specifications or the performance of
                  any design or specification provided by the Customer.
                </>
              }
            />
            <ContentTermAndCondition
              content={
                <>
                  {' '}
                  The Seller retains a purchase money security interest in all
                  products sold until the purchase price and any other charges
                  are fully paid. In the event of the Customer's breach of these
                  terms and conditions, the Seller has rights and remedies as a
                  secured party under applicable law. The Customer is
                  responsible for all costs incurred by the Seller in collecting
                  outstanding sums, including collection agency fees and
                  reasonable attorney's fees. The Seller has the right to offset
                  any amount owed by the Seller or its subsidiaries to the
                  Customer against any amount owed by the Customer to the Seller
                  or its subsidiaries. All transactions are governed by the laws
                  of the State of California, and the parties waive the right to
                  a trial by jury.
                </>
              }
            />
            <ContentTermAndCondition
              content={
                <>
                  Products are considered accepted by the Customer unless
                  written notice of shortages, damage, or defects is provided to
                  the Seller within 10 days of delivery. No returns are
                  permitted without a Return Authorization Form issued by the
                  Seller. If the Customer refuses to accept or return products
                  without authorization, the Seller will hold the products for
                  20 days before considering them abandoned and disposing of
                  them without crediting the Customer's account.
                </>
              }
            />
            <div>
              <p className="font-bold">Sales Tax:</p>
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    For US shipments, Seller will collect Federal, State, and/or
                    Local sale, use, excise, and other taxes as required by law.
                    These taxes are in addition to the purchase price and must
                    be remitted by the Customer, unless the Customer is tax
                    exempt and has provided a valid signed tax exemption
                    certificate to Seller.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    For international shipments, all applicable VAT, PST, HST,
                    and/or GST charges, along with brokerage fees, are the
                    responsibility of the Customer and are due at the time of
                    delivery.
                  </>
                }
              />
            </div>
            <div>
              <p className="font-bold">Force Majeure:</p>
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Seller shall not be held liable for delays in delivery or
                    failure to perform its obligations due to causes beyond its
                    reasonable control, including product allocations, material
                    shortages, labor disputes, transportation delays, unforeseen
                    circumstances, acts of God, acts or omissions of other
                    parties, acts or omissions of civil or military authorities,
                    government priorities, fires, strikes, floods, severe
                    weather conditions, computer interruptions, terrorism,
                    epidemics, quarantine restrictions, riots, or war. Seller's
                    time for delivery or performance will be extended by the
                    period of such delay, or Seller may, at its option, cancel
                    any order or remaining part thereof without liability by
                    providing notice to the Customer.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    This document supersedes any purchase order or customer
                    document and is considered an offer. By accepting products
                    or services, making payments, or placing orders after
                    receiving these terms and conditions, the Customer is deemed
                    to have agreed to these terms and conditions, regardless of
                    any conflicting terms in prior or subsequent communications.
                    The Seller's failure to object to any document or act by the
                    Customer does not waive these terms and conditions. Any
                    changes or additions to these terms and conditions must be
                    agreed upon in writing by an authorized officer of the
                    Seller.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    If the Customer's order is placed under a contract with the
                    United States Government, the Seller agrees to comply only
                    with the contract provisions and regulations communicated in
                    writing by the Customer. United States Government Cost
                    Accounting Standards do not apply. The Seller reserves all
                    rights to technical data and software owned or licensed by
                    the Seller or the manufacturer. Unless specifically agreed
                    in writing by the Seller, the products are not intended for
                    use in life support systems, human implantation, nuclear
                    facilities or systems, or any application where product
                    failure could result in loss of life or catastrophic
                    property damage. The Customer will indemnify and hold the
                    Seller harmless from any loss, cost, or damage resulting
                    from the Customer's breach of this provision.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Products may be subject to export or resale restrictions and
                    regulations, and the Customer acknowledges the obligation to
                    comply with such restrictions. Statements regarding product
                    origin, Export Control Classification Number, or compliance
                    with applicable laws are based on information provided to
                    the Seller by its suppliers, and the Seller does not
                    guarantee accuracy. The Seller, Source, and Customer certify
                    compliance with all applicable laws, including labor laws
                    and anti-bribery regulations, in the jurisdictions where
                    they operate.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Except for the exclusive warranty remedy described above,
                    neither the Seller nor its Sources shall be liable to the
                    Customer or any other person for any claim, loss, damage, or
                    expense arising directly or indirectly from product
                    inadequacy, deficiency, defect, use, performance, or the
                    Seller's failure or delay in performance. This includes
                    consequential, exemplary, or punitive damages, even if the
                    Seller was informed of the possibility of such damages. The
                    Seller's liability, regardless of basis, is limited to the
                    price paid for the product or service that gave rise to the
                    claim.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Value-added services may void the Source's warranty and make
                    products non-returnable. Orders incorporating such services
                    are non-cancelable, and the products are non-returnable.
                    Third-party value-added service providers are considered
                    agents of the Customer. The Seller provides technical advice
                    as an accommodation to the Customer and assumes no liability
                    for the content or use of such advice.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Software or intellectual property included in or related to
                    the products is supplied by the manufacturer or licensor,
                    and the Seller makes no representation or warranty regarding
                    such software or intellectual property. The Customer agrees
                    to comply with all requirements and rights related to
                    proprietary and similar rights in the intellectual property.
                    The Customer will indemnify the Seller against any
                    liability, cost, or expense resulting from a breach of these
                    requirements or from the Customer's use or sale of the
                    products.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Unclaimed credit balances or sums owed to the Customer
                    become the property of the Seller after twelve months.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Returns are normally accepted within 10 days of the ship
                    date for the convenience of the Customer. If Seller agrees
                    to accept a return, return freight charges must be prepaid
                    by the Customer. Seller does not accept COD (collect on
                    delivery) shipments. Some products may require return
                    directly to the affiliates. All return items must be in the
                    original packaging, unused, untested, un-programmed, and in
                    resalable condition. Customers should contact a Customer
                    Service Representative for a Return Materials Authorization
                    Number and addressing instructions before returning a
                    product. ESD, programmable semiconductors, or
                    moisture-sensitive products that have been opened are not
                    eligible for credit. It's important to note that these
                    return policies do not apply to
                    NON-CANCELABLE/NON-RETURNABLE PRODUCTS. (Refer to the
                    NON-CANCELABLE/NON-RETURNABLE PRODUCTS section in these
                    terms.)
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    By returning products to Seller, the Customer certifies that
                    the products were purchased from Seller and that no
                    substitution of the same product from another supplier,
                    distributor, or source has occurred. Returns should be made
                    in the original packaging (Source or Seller) and in unused
                    and untested condition unless defective. ESD, programmable
                    semiconductors, or moisture-sensitive products should not be
                    opened.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Seller Electronics maintains Country of Origin information
                    on all products in its inventory. This information is
                    provided to Customers on product labels and shipping
                    documents. The information is based on manufacturer-provided
                    information according to US Treasury, US Customs
                    Regulations.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    In no event shall Seller be liable for any special,
                    incidental, or consequential damages of any nature,
                    including, but not limited to, damages resulting from loss
                    of profit or revenue, recall costs, claims for service
                    interruptions or failure to supply, downtime, testing,
                    installation, or removal costs, costs of substitute
                    products, property damage, personal injury, death, or legal
                    expenses. Customer's recovery from Seller for any claim
                    shall not exceed the purchase price paid by the Customer for
                    the goods, irrespective of the nature of the claim, whether
                    in warranty, contract, or otherwise. The Customer shall
                    indemnify, defend, and hold Seller harmless from any claims
                    brought by any party regarding products supplied by Seller
                    and incorporated into the Customer's product.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Customer may not change, cancel, or reschedule orders for
                    products without the consent of Seller. If the Customer
                    cancels the order after it has been accepted by Seller, the
                    Seller may request the Customer to pay reasonable
                    cancellation or reliance charges. These charges are to be
                    paid by the Customer. Requests by the Customer to reschedule
                    are subject to acceptance by Seller at its sole discretion.
                    Orders cannot be canceled or rescheduled after they have
                    been submitted by Seller to the shipment carrier. Seller
                    reserves the right to limit or cancel any order, allocate
                    sales, limit quantities of selected products, and limit
                    selected products to its customers. Seller also reserves the
                    right to reject any order, or any part of an order. Product
                    specifications and availability are subject to change
                    without prior notice.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    Seller is committed to compliance with all U.S., EU member
                    state, UK, and selected foreign export, import, customs, and
                    economic sanctions laws, regulations, rules, and orders
                    (collectively referred to as "Trade Control Laws") that
                    apply to products purchased from Exepart.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Seller will not sell or ship products to embargoed countries
                    or individuals and entities restricted by the U.S. Treasury
                    Office of Foreign Asset Control ("OFAC") list of Specially
                    Designated Nationals, including entities that are owned 50%
                    or more by such individuals or entities, the U.S. Commerce
                    Department's Bureau of Industry and Security ("BIS") Denied
                    Persons List, Entity List, Unverified List, and Military End
                    User list. Exepart will not export products prohibited by
                    the Export Administration Regulations ("EAR").
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Seller prohibits the shipment of any product that requires
                    an export license pursuant to the EAR or Department of
                    State's International Traffic in Arms Regulations ("ITAR").
                    Exepart participates in BIS Export Enforcement and OFAC
                    transaction reporting. Exepart immediately reports
                    suspicious purchases to the proper authorities for
                    investigation.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    Considering the numerous sanctions imposed upon Russia and
                    Belarus by governments and organizations worldwide, Seller
                    will not ship any products to Russia, the Donetsk and
                    Luhansk regions of Ukraine, and Belarus.
                  </>
                }
              />
            </div>
            <div>
              <p className="font-bold">
                Resale/Transfer/Re-Export of Products:
              </p>
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    The Customer understands and acknowledges that all products
                    purchased from Seller are subject to Trade Control Laws and
                    shall only be resold, transferred, re-exported, or disposed
                    of in strict compliance with these laws.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    The Customer acknowledges that products purchased from
                    Seller may not be brokered, transshipped, resold,
                    transferred, re-exported, or disposed of to any company,
                    entity, or person identified by BIS: BIS Parties of Concern,
                    or to countries, individuals, or organizations identified by
                    OFAC: Specially Designated Nationals and Blocked Persons
                    list; and Sanctions Programs and Country Information,
                    including sanctions imposed on Iran, North Korea, Cuba,
                    Syria, Venezuela, Sudan, Russia, the Crimea, Donetsk and
                    Luhansk regions of Ukraine, and Belarus, among others.
                  </>
                }
              />
              <ContentTermAndCondition
                content={
                  <>
                    {' '}
                    The Customer acknowledges that, before exporting or
                    re-exporting any product, the Customer is responsible for
                    determining if the product is controlled, prohibited, or
                    restricted for export or import and for obtaining any
                    necessary export, re-export, or import licenses as required
                    by Trade Control Laws.
                  </>
                }
              />
            </div>
            <div>
              <p className="font-bold">Export Classification Disclaimer:</p>
              <ContentTermAndCondition
                content={
                  <>
                    Any use of Seller classifications, including ECCNs or any
                    variation of Harmonized Tariff codes, is done at the user's
                    own risk and without recourse to Seller. Export
                    classifications are subject to change. If the Customer
                    exports or re-exports any product, the Customer, as the
                    exporter of record, is responsible for determining the
                    correct classification of the item at the time of export.
                    Any export classification provided by Seller is for Seller’s
                    internal use only and should not be construed as a
                    representation or warranty regarding the proper export
                    classification, nor should it be relied upon for making
                    licensing determinations.
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
          </LightButton>
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
          </PrimaryButton> */}
        </>
      }
    ></BaseModalXLarge>
  )
}
