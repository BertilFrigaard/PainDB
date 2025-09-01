"use client";
import { useState } from "react";
import DropDown from "../DropDown";
import { IoMenu } from "react-icons/io5";

export default function DropDownBurger({ items }: { items: { text: string; link?: string; func?: () => void }[] }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <DropDown items={items} expanded={expanded} setExpanded={setExpanded}>
            <IoMenu className="text-4xl text-secondary" />
        </DropDown>
    );
}
