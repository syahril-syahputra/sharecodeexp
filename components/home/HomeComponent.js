import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton';
import ImageLogo from '@/components/ImageLogo/ImageLogo';
import TextInput from '@/components/Interface/Form/TextInput';
import Link from 'next/link';

const HomeComponent = () => {
  return (
    <div className="w-full inline-block">
      <section className="bg-white pb-44 overflow-hidden h-3/6 bg-gradient-to-b from-indigo-50 via-white">
        <div className="container mx-auto mt-48">
          <div className="">
            <div className="relative object-center px-12 md:px-4 ml-auto mr-auto">
              <ImageLogo size={700} color="gradient" />
            </div>
            <h1 className="hidden">
              Search and find your components from top industry manufacturer's
              excess stocks.
            </h1>

            <div className="w-3/4 ml-auto mr-auto">
              <div className="text-center">
                <p className="text-xl font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  EXEpart is a closed sales platform that only allows verified
                  industrial manufacturers to list their excess stocks and buy
                  stocks from fellow manufacturers. It is a great tool to
                  overcome the shortage crisis while enabling the manufacturers
                  to capitalize their unused stocks. No brokers are allowed to
                  register at EXEpart.
                </p>
              </div>
            </div>

            <div className="w-full px-12 md:px-4 ml-auto mr-auto">
              <div className="text-center items-stretch mb-3 mt-3">
                <TextInput
                  value={search}
                  onChange={(target) => setSearch(target.value)}
                  onKeyDown={searchComponent}
                  type="text"
                  setIcon="fas fa-search"
                  className="md:w-8/12  border-2"
                  placeholder="Search for the components"
                />
              </div>
              <div className="text-center">
                {suggestion && suggestion.length > 0 && (
                  <div>
                    {isSuggestionLoading && (
                      <div className="text-blueGray-500">
                        Suggestion :
                        <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                      </div>
                    )}
                    {!isSuggestionLoading && (
                      <div className="flex justify-center">
                        <span className="text-blueGray-500">Suggestion :</span>
                        {suggestion.map((name) => (
                          <Link
                            key={name}
                            href={`/product/search?q=${name}`}
                            className="mx-1 underline text-blue-500 italic"
                          >
                            {name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {isSuggestionLoading && suggestion.length === 0 && (
                  <i className="ml-2 fas fa-circle-notch fa-spin"></i>
                )}
              </div>
              <div className="text-center mt-8">
                <Link href={!!search ? `/product/search?q=${search}` : ''}>
                  <div className="w-full">
                    <PrimaryButton className="uppercase font-bold w-6/12 md:w-4/12 lg:w-2/12">
                      Search
                    </PrimaryButton>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;
