"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectItem } from "@heroui/react";

import { useGeografiaStore } from "@/store/geografia.store";
import { Municipio } from "@/types/municipio";
import { Departamento } from "@/types/departamento";
import { Vereda } from "@/types/vereda";

interface LocationSelectorProps {
  initialVeredaId?: number | string | null;
  onChange: (selection: {
    departamento?: Departamento;
    municipio?: Municipio;
    vereda?: Vereda;
  }) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  initialVeredaId,
  onChange,
}) => {
  const departamentos = useGeografiaStore((state) => state.data) || [];

  const [selectedDepartamento, setSelectedDepartamento] = useState<
    Departamento | undefined
  >();
  const [selectedMunicipio, setSelectedMunicipio] = useState<
    Municipio | undefined
  >();
  const [selectedVereda, setSelectedVereda] = useState<any>();

  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [veredas, setVeredas] = useState<any[]>([]);

  useEffect(() => {
    if (initialVeredaId && departamentos.length > 0) {
      for (const depto of departamentos) {
        for (const mun of depto.municipios) {
          const ver = mun.veredas.find(
            (v: { id: { toString: () => string } }) =>
              v.id.toString() === initialVeredaId.toString(),
          );

          if (ver) {
            setSelectedDepartamento(depto);
            setSelectedMunicipio(mun);
            setSelectedVereda(ver);
            onChange({ departamento: depto, municipio: mun, vereda: ver });

            return;
          }
        }
      }
    }
  }, [initialVeredaId, departamentos]);

  useEffect(() => {
    if (selectedDepartamento) {
      setMunicipios(selectedDepartamento.municipios || []);
      setVeredas([]);
    } else {
      setMunicipios([]);
      setVeredas([]);
    }
  }, [selectedDepartamento]);

  useEffect(() => {
    if (selectedMunicipio) {
      const veredasData = selectedMunicipio.veredas || [];

      setVeredas([
        { id: "null", nombre: "Cabecera Municipio" },
        ...veredasData,
      ]);
    } else {
      setVeredas([]);
    }
  }, [selectedMunicipio]);

  const handleDepartamentoChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedId = event.target.value;
    const depto = departamentos.find((d) => d.id == parseInt(selectedId));

    if (depto) {
      setSelectedDepartamento(depto);
      setSelectedMunicipio(undefined);
      setSelectedVereda(undefined);
      onChange({ departamento: depto });
    }
  };

  const handleMunicipioChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedId = event.target.value;
    const mun = municipios.find((m) => m.id == parseInt(selectedId));

    if (mun) {
      setSelectedMunicipio(mun);
      setSelectedVereda(undefined);
      onChange({ departamento: selectedDepartamento, municipio: mun });
    }
  };

  const handleVeredaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;

    if (selectedId === "null") {
      setSelectedVereda({ id: "null", nombre: "Cabecera Municipio" });
      onChange({
        departamento: selectedDepartamento,
        municipio: selectedMunicipio,
        vereda: undefined,
      });

      return;
    }
    const ver = veredas.find((v) => v.id == parseInt(selectedId));

    if (ver) {
      setSelectedVereda(ver);
      onChange({
        departamento: selectedDepartamento,
        municipio: selectedMunicipio,
        vereda: ver,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          items={departamentos}
          label="Departamento"
          labelPlacement="outside"
          placeholder="Seleccione un departamento"
          selectedKeys={
            selectedDepartamento ? [String(selectedDepartamento.id)] : []
          }
          onChange={handleDepartamentoChange}
        >
          {(depto) => <SelectItem key={depto.id}>{depto.nombre}</SelectItem>}
        </Select>

        <Select
          isDisabled={!selectedDepartamento}
          items={municipios}
          label="Municipio"
          labelPlacement="outside"
          placeholder="Seleccione un municipio"
          selectedKeys={selectedMunicipio ? [String(selectedMunicipio.id)] : []}
          onChange={handleMunicipioChange}
        >
          {(mun) => <SelectItem key={mun.id}>{mun.nombre}</SelectItem>}
        </Select>

        <Select
          isDisabled={!selectedMunicipio}
          items={veredas}
          label="Vereda"
          labelPlacement="outside"
          placeholder="Seleccione una vereda"
          selectedKeys={selectedVereda ? [String(selectedVereda.id)] : []}
          onChange={handleVeredaChange}
        >
          {(ver) => <SelectItem key={ver.id}>{ver.nombre}</SelectItem>}
        </Select>
      </div>
    </div>
  );
};
