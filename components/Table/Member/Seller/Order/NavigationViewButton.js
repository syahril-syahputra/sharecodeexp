import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton"
import Link from "next/link"

function NavigationViewButton({navigationId}){
    return (
        <Link href={`/admin/member/seller/incoming-inquiry/details/${navigationId}`}>
            <PrimaryButton
                size="sm">
                View
            </PrimaryButton>
        </Link>
    )
}

export default NavigationViewButton