import React from 'react'

interface NavbarItemProps {
    label: string;
    href: string;
}

const NavbarItem = ({ label, href }: NavbarItemProps) => {
    return (
        <a href={href}>
            {label}
        </a>
    );

};


export default NavbarItem;