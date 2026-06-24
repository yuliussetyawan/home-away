'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

function NavSearch() {
  // Get current URL search parameters (like ?search=something)
  const searchParams = useSearchParams();
  // Get current URL path (like /about or /home)
  const pathname = usePathname();

  const { replace } = useRouter();
  // Initialize search state with existing search param or empty string
  // Example: if URL is /?search=beach, this will be "beach"
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '');

  const handleSearch = useDebouncedCallback((value: string) => {
    // Create new URLSearchParams object from current params
    // Example 1: if current URL is /?category=house&search=beach
    // params will contain: { category: "house", search: "beach" }
    const params = new URLSearchParams(searchParams);

    if (value) {
      // Example 2: if value is "pool"
      // params.set('search', 'pool') will update/add search parameter
      // URL becomes /?category=house&search=pool
      params.set('search', value);
    } else {
      // Example 3: if value is empty string
      // params.delete('search') removes search parameter
      // URL becomes /?category=house
      params.delete('search');
    }
    // Example 4: if pathname is "/rentals" and params has category=house&search=pool
    // Final URL will be /rentals?category=house&search=pool
    replace(`/?${params.toString()}`);
  }, 1000)

  // Reset search input when search param is removed
  // Example: When user clicks back button and search param is gone
  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('');
    }
  }, [searchParams.get('search')])

  return (
    <Input 
      type='search' 
      placeholder='find a property...' 
      className='max-w-xs dark:bg-muted' 
      onChange={(e) => {
        // Example: User types "beach house"
        setSearch(e.target.value);  // Updates input field immediately
        handleSearch(e.target.value);  // After 1s delay, updates URL to include ?search=beach%20house
      }} 
      value={search} 
    />
  )
}

export default NavSearch