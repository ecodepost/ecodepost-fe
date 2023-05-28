import { useState } from 'react';

export default () => {
  const [name, setName] = useState<string>();
  return {
    setName,
    name,
  };
};
