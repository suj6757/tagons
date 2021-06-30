import React, { useState } from 'react';
import { Button, Popover, PopoverBody } from 'reactstrap';

const PopoverItem = ({ id, item, style, className }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <span>
      <Button
        className="mr-1 mb-2"
        color="secondary"
        id={`popover_${id}`}
        onClick={() => setPopoverOpen(true)}
      >
        {item.text}
      </Button>
      <Popover
        className={className}
        style={style}
        placement={item.placement}
        isOpen={popoverOpen}
        target={`popover_${id}`}
        toggle={() => setPopoverOpen(!popoverOpen)}
      >
        <PopoverBody>{item.body}</PopoverBody>
      </Popover>
    </span>
  );
};
export default PopoverItem;
