import CardInformation from './CardInformation';

export default function DestinationCard({
  keyword,
  information,
  loadingState,
}) {
  const citiesArray = information?.data ?? [];

  if (loadingState === true && keyword) {
    return (
      <div>
        <h1 className='text-2xl text-white font-extrabold text-center'>
          Searching for{' '}
          <span className='text-gray-950 bg-red-500 py-1 px-2 rounded text-lg'>
            {keyword}
          </span>{' '}
          . . .
        </h1>
      </div>
    );
  }

  if (citiesArray.length < 1 && keyword && loadingState === false) {
    return (
      <div>
        <h1 className='text-2xl text-white font-extrabold text-center'>
          No information about{' '}
          <span className='text-gray-950 bg-red-500 py-1 px-2 rounded text-lg'>
            {keyword}
          </span>{' '}
          ! ! !
        </h1>
      </div>
    );
  }

  if (citiesArray.length < 1) return;

  return (
    <div className='mb-5'>
      <h1 className='text-2xl text-white font-extrabold text-center'>
        Related to the search{' '}
        <span className='text-gray-950 bg-amber-200 py-1 px-2 rounded text-lg'>
          {keyword}
        </span>
      </h1>
      {citiesArray.map((item, index) => {
        let city = item['name'];
        let country = item['address']['countryName'];
        const cityCode = citiesArray[index]?.address?.cityCode;
        return (
          <CardInformation
            city={city}
            country={country}
            key={index}
            cityCode={cityCode}
          />
        );
      })}
    </div>
  );
}