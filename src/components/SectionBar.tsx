export const SectionBar = ({ text }: { text: string }) => {

    return (
        <div style={{ maxWidth: "424px", }} className="relative">
  
            <h2 className="absolute inset-0 m-auto font-asterdam flex justify-center items-center mt-4"
            style={{fontSize: "2rem", letterSpacing:"0.3rem"}}>
                <span className="text-color3">{text?.length > 1 ? text[0] : ""}</span>
                <span >{text?.substring(1)}</span>
            </h2>
        </div>
    )
}
