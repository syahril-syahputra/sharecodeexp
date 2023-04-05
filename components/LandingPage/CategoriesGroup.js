import Link from "next/link"
export default function CategoriesCard(props){
    return (
      <>
        <div id={props.category.name} className="h-10">
          <i className="hidden">{props.category.name}</i>
        </div>

        <div className="bg-white p-2 shadow">
          <Link href={`/product/search?category=${props.category.name}`}>
            <h3 className="text-2xl font-semibold leading-normal my-2 text-blueGray-700 underline">
              {props.category.name}
            </h3>
          </Link>
          <hr/>
          <div className="pt-5 grid md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-1">
            {props.category.subcategory.map((item, index) => {
              return(
                <div key={index}>
                  <Link href={`/product/search?subcategory=${item.name}`}>
                    <p className="text-sm underline">{item.name}</p>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
}
