import Dropdown from './components/Dropdown';

const options = [
  {
    id: 1,
    content: 'Some content for first item',
    onClick: () => console.log('first'),
  },
  {
    id: 2,
    content: 'Some content for second item',
    onClick: () => console.log('second'),
  },
  {
    id: 3,
    content: 'Some content for third item',
    onClick: () => console.log('third'),
  },
];

function App() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        {(props) => <button {...props}>{'Open dropdown'}</button>}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {options.map(({onClick, content, id}) => (
          <Dropdown.Item
            key={id}
            onClick={onClick}
          >
            {content}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default App;
