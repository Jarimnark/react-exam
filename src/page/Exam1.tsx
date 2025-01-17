import { FixedSizeList as List, ListChildComponentProps } from "react-window";

const items = Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`);

// Define the type for the Row component props
const Row: React.FC<ListChildComponentProps> = ({ index, style }) => (
  <div style={{ ...style, padding: '0 1rem', textAlign: 'center' }}>{items[index]}</div>
);

const VirtualizedList: React.FC = () => {
  return (
    <List
      className="border border-black p-4 "
      height={400} // Height of the visible area
      itemCount={items.length} // Total number of items
      itemSize={45} // Height of each row
      width="100%" // Width of the list
    >
      {Row}
    </List>
  );
};


export default function Exam1() {
  return <>
    <h3 className="text-center font-bold m-8 text-3xl">Exam 1</h3>
    <div className="p-3 border border-black rounded-lg">
      <VirtualizedList />
    </div>
  </>
}