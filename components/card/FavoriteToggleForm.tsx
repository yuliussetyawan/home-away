'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { toggleFavoriteAction } from '@/utils/actions';
import { CardSubmitButton } from '../form/Buttons';

type FavoriteToggleFormProps = {
  propertyId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({
  propertyId,
  favoriteId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  // Method 1 (current): Using bind
  // - Creates function once during component initialization
  // - More memory efficient as it doesn't create new function on each render
  // - Pre-configures function with fixed parameters
  const toggleAction = toggleFavoriteAction.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  });

  // Method 2 (alternative): Using arrow function
  // - Creates new function on every render
  // - Less memory efficient but more readable
  // - More familiar syntax for many developers
  // const toggleAction = () => toggleFavoriteAction({
  //   propertyId,
  //   favoriteId,
  //   pathname,
  // });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;