export default function CompaniesGroup(props){
  console.log(props)
    return (
        <div className="bg-white p-2 shadow">
            <h3 className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {props.company.company_alphabet}
            </h3>
            <hr/>
            <div className="pt-5 grid md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-1">
              {props.company.companies.map((item, index) => {
                return(
                  <div key={index}>
                    <p className="text-sm underline">{item.name}</p>
                  </div>
                )
              })}
            </div>
        </div>
    )
}
