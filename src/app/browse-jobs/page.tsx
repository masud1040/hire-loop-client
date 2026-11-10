import React from 'react';

const BrowsJobs = async ({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const search = await searchParams;
  console.log("searchParams", search);
    return (
        <div>
    
            
        </div>
    );
};

export default BrowsJobs;