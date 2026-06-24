import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { fetchPropertyDetails, findExistingReview } from "@/utils/actions";
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation";
import Amenities from "@/components/properties/Amenities";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyRevies";
import { auth } from '@clerk/nextjs/server'

// Dynamically import the PropertyMap component
// This prevents the component from being included in the server-side render
const DynamicMap = dynamic(
    // Use dynamic import to load the component only on the client side
    () => import('@/components/properties/PropertyMap'),
    {
        // Disable server-side rendering (SSR) for this component
        // Useful if the component relies on browser-specific APIs like `window` or `navigator`
        ssr: false,

        // Display this loading UI (a Skeleton component) while the map is being loaded
        // Enhances UX by showing a placeholder instead of a blank space
        loading: () => <Skeleton className='h-[400px] w-full' />,
    }
);

const DynamicBookingWrapper = dynamic(() => import('@/components/booking/BookingWrapper'), {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />
})

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const { userId } = auth();
    const property = await fetchPropertyDetails(params.id);
    if (!property) redirect('/')
    const isNotOwner = property?.profile.clerkId !== userId;
    const reviewDoesNotExist =
        userId && isNotOwner && !(await findExistingReview(userId, property?.id));

    const { baths, bedrooms, beds, guests } = property;
    const details = { baths, bedrooms, beds, guests };
    const firstName = property.profile.firstName;
    const profileImage = property.profile.profileImage;

    return <section>
        <BreadCrumbs name={property.name} />
        <header className="flex justify-between items-center mt-4">
            <h1 className="text-4xl font-bold">{property.tagline}</h1>
            <div className='flex items-center gap-x-4'>
                {/* share button */}
                <ShareButton propertyId={property.id} name={property.name} />
                <FavoriteToggleButton propertyId={property.id} />
            </div>
        </header>
        <ImageContainer mainImage={property.image} name={property.name} />
        <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
            <div className='lg:col-span-8'>
                <div className='flex gap-x-4 items-center'>
                    <h1 className='text-xl font-bold'>{property.name}</h1>
                    <PropertyRating inPage propertyId={property.id} />
                </div>
                <PropertyDetails details={details} />
                <UserInfo profile={{ firstName, profileImage }} />
                <Separator className='mt-4' />
                <Description description={property.description} />
                <Amenities amenities={property.amenities} />
                <DynamicMap countryCode={property.country} />
            </div>
            <div className='lg:col-span-4 flex flex-col items-center'>
                {/* calendar */}
                <DynamicBookingWrapper
                    propertyId={property.id}
                    price={property.price}
                    bookings={property.bookings}
                />

            </div>
        </section>
        {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
        <SubmitReview propertyId={property.id} />
        <PropertyReviews propertyId={property.id} />
    </section>;
}

export default PropertyDetailsPage;