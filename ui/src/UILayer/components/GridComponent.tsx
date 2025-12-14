import React from 'react';


// Define styled components using CSS
const GridContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div className="grid grid-cols-5 gap-5" >
            {children}
        </div>
    );
};
interface GridItemProps {
    children?: React.ReactNode;
    url?: string;
    imageUrl?:string;
}
const GridItem: React.FC<GridItemProps> = ({ children, url ,imageUrl}) => {



    return (
        <div className="bg-indigo-600 text-white border-2 border-black hover:saturate-50 min-h-[150px] h-[200px] flex items-center justify-center ">
            <a href={url} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white w-full 
            h-full border border-black hover:saturate-50 flex items-center 
            justify-center  gap-2 flex-col">
                <div className=" h-[150px] w-full ">
                    <img alt={imageUrl} />
                </div>
                <div className=" text-white font-bold justify-center align-top">
                    {children}
                </div>

            </a>
        </div>
    );
};

function GridComponent() {
  return (
    <GridContainer>
      <GridItem url={"/widget/1"}>Widget1</GridItem>
        <GridItem url={"http://192.168.3.1:6699/apps/dashboard/"}>Nextcloud</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>

      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>

    </GridContainer>
  );
}

export default GridComponent;