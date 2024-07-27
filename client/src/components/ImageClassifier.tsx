import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import * as tmImage from "@teachablemachine/image";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
interface Prediction {
  className: string;
  probability: number;
}

const ImageClassifier = ({ handleClose }: { handleClose: () => void }) => {
  const navigate = useNavigate();
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState("");
  const handleSearchVal = (val: string) => setSearchVal(val);
  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/shop/1?search=${searchVal}`);
    handleClose();
  };
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const init = async () => {
      const modelURL =
        "https://teachablemachine.withgoogle.com/models/GzbkLfRc9/model.json";
      const metadataURL =
        "https://teachablemachine.withgoogle.com/models/GzbkLfRc9/metadata.json";
      const model = await tmImage.load(modelURL, metadataURL);
      setModel(model);
    };
    init();
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && model) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imgElement = new Image();
        imgElement.src = e.target?.result as string;
        setImageUrl(e.target?.result as string);
        imgElement.onload = async () => {
          const prediction = (await model.predict(
            imgElement,
            false,
          )) as Prediction[];
          displayPrediction(prediction);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const displayPrediction = (prediction: Prediction[]) => {
    handleSearchVal(
      prediction.find(
        (p) =>
          p.probability === Math.max(...prediction.map((p) => p.probability)),
      )?.className || "",
    );
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setSearchVal("");
  };

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmitSearch}
        className="absolute left-[50%] top-[80px] mx-auto flex w-[80%] translate-x-[-50%] items-center gap-2 rounded-sm border border-[#d5cfcf] bg-white px-4 py-1 text-lg shadow-lg transition-all duration-1000"
      >
        <input
          disabled={imageUrl ? true : false}
          className="w-full p-1 outline-none"
          type="text"
          placeholder="Search..."
          name="searchVal"
          value={searchVal}
          onChange={(e) => handleSearchVal(e.target.value)}
          required
        />
        <label htmlFor="imageClassify" className="cursor-pointer text-2xl">
          <BsCardImage />
        </label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          id="imageClassify"
          onChange={handleImageUpload}
        />
        {imageUrl && (
          <div className="relative mr-4 mt-4 w-[100px] p-2">
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{ maxWidth: "100px", height: "auto" }}
            />
            <div className="absolute right-[-10px] top-0 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#aaa] p-2">
              <button onClick={handleRemoveImage}>x</button>
            </div>
          </div>
        )}
        <button type="submit" className="cursor-pointer text-3xl sm:block">
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default ImageClassifier;
