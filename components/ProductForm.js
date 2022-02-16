import { useState, useContext } from "react"
import { formatter } from "../utils/helpers"
import ProductOptions from "./ProductOptions"
import { CartContext } from '../context/shopContext'

export default function ProductForm({ product }) {

    const { addToCart } = useContext(CartContext)

    const allVariantOptions = product.variants.edges?.map(variant => {
        const allOptions = {}

        variant.node.selectedOptions.map(item => {
            allOptions[item.name] = item.value
        })

        return {
            id: variant.node.id,
            title: product.title,
            handle: product.handle,
            image: variant.node.image?.originalSrc,
            options: allOptions,
            variantTitle: variant.node.title,
            variantPrice: variant.node.priceV2.amount,
            variantQuantity: 1
        }
    })

    const defaultValues = {}
    product.options.map(item => {
        defaultValues[item.name] = item.values[0]
    })

    const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
    const [selectedOptions, setSelectedOptions] = useState(defaultValues)
    const [inputValue, setInputValue] = useState("");

    function setOptions(name, value) {
        setSelectedOptions(prevState => {
            return { ...prevState, [name]: value }
        })

        const selection = {
            ...selectedOptions, 
            [name]: value
        }

        allVariantOptions.map(item => {
            if (JSON.stringify(item.options) === JSON.stringify(selection)) {
                setSelectedVariant(item)
                selectedVariant.variantQuantity = 1
                setInputValue(selectedVariant.variantQuantity)
                console.log(selectedVariant.variantQuantity)
            }
        })
    }

    const increment = () => {
        selectedVariant.variantQuantity += 1
        setInputValue(selectedVariant.variantQuantity)
        console.log(selectedVariant.variantQuantity)
    }

    const decrement = () => {
        setInputValue(selectedVariant.variantQuantity)
        if (selectedVariant.variantQuantity > 1) {
            selectedVariant.variantQuantity -= 1
            setInputValue(selectedVariant.variantQuantity)
        }
        console.log(selectedVariant.variantQuantity)
    }

    const handleChange = (e) => {
        selectedVariant.variantQuantity = Number(e.target.value);
        setInputValue(selectedVariant.variantQuantity)
        console.log(selectedVariant.variantQuantity)
    }


  return (
    <div className="rounded-2xl p-4 relative -top-4 md:top-0 shadow-lg flex flex-col w-11/12 md:w-[390px]">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-3 text-xl">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</span>
      {
          product.options.map(({ name, values }) => (
              <ProductOptions 
              key={`key-${name}`}
              name={name}
              values={values}
              selectedOptions={selectedOptions}
              setOptions={setOptions}
              />
          ))
      }
       <div className="inline-block mt-6 mb-2 ml-1">
        <button 
        onClick={decrement}
        className='border-2 px-3 rounded-l-md py-1 font-semibold hover:bg-gray-200 active:bg-gray-500 active:text-white'>
          &mdash;
        </button>
        <input className="text-center border-y-2 border-x-0 rounded-none w-16 py-1 font-semibold" type="text" placeholder="1" min={1} max={30} value={inputValue} onChange={handleChange} />
        <button 
        onClick={increment}
        className='border-2 px-3 rounded-r-md py-1 font-semibold hover:bg-gray-200 active:bg-gray-500 active:text-white'>
          &#xff0b;
        </button>  
      </div>   
      <button 
      onClick={() => {
          addToCart(selectedVariant)
      }}
      className="font-semibold bg-black rounded-lg text-white px-2 py-3 mt-8 hover:bg-gray-800">Add to Cart</button>
    </div>
  )
}
