import { Select, SelectItem } from "@heroui/react";
import React from "react";



const geografia = () => {
  return (
    <>
      <Select
        label="Municipio"
        labelPlacement="outside"
        name="municipio"
        selectedKeys={[departamento]}
        onChange={handleChange}
      >
        <SelectItem key="none">Add or create a relation</SelectItem>
      </Select>
      <Select
        label="Municipio"
        labelPlacement="outside"
        name="municipio"
        selectedKeys={[municipio]}
        onChange={handleChange}
      >
        <SelectItem key="none">Add or create a relation</SelectItem>
      </Select>
      <Select
        label="Vereda"
        labelPlacement="outside"
        name="vereda"
        selectedKeys={[vereda]}
        onChange={handleChange}
      >
        <SelectItem key="none">Add or create a relation</SelectItem>
      </Select>
    </>
  );
};

export default geografia;
