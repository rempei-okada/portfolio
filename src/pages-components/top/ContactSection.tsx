import { BrushStroke } from "@/components/decorations"
import { SectionType1 } from "@/components/SectionType1"
import { resources } from "@/constants"
import { FaEnvelope } from "react-icons/fa"

export const ContactSection = () => {

    return (
        <SectionType1 disableLine className="bg-paper2 mt-8 md:mt-48 " innerClassName="items-center flex-col">
            <h2 className={`text-3xl font-light mb-12 tracking-wider`}
            >
                CONTACT
                <span className="block text-base mt-1 text-nezumi" >お問い合わせ</span>
            </h2>

            <BrushStroke className="top-16 left-32 transform rotate-1 w-48" />

            <div className="max-w-md">
                <a
                    href="mailto:contact@renpei-okada.com"
                    className="flex items-center p-6 bg-white bg-opacity-80 transform hover:rotate-1 transition-transform"
                >
                    <FaEnvelope size={20} className="mr-4 text-akane" />
                    <span>メールで問い合わせ</span>
                </a>
            </div>


            
            <div className="bg-white p-8 md:p-16 md:px-48 w-full my-8 md:my-32">
                <h2 className="text-title2 font-bold text-center mb-2">CONTACT</h2>
                <p className="text-center text-gray-600 mb-8">お問い合わせ・お見積りはお気軽にどうぞ。</p>
                <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
                    <a href={`mailto:${resources.email}`} className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        メールで問い合わせ
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </SectionType1 >
    )
}
