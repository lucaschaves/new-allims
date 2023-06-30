"use client";
import { Grid, Hello, Icon, Popover, Sidebar, Split } from "@/components";
import { useGet } from "@/hooks";
import { joinClassName } from "@/utils";
import Image from "next/image";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { BiMoveHorizontal } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";

let x = 0;
let y = 0;

// Width of left side
let leftWidth = 0;

const gridDataFake = {
    columns: Array.from({ length: 5 }).map((_, i) => ({
        field: `column${i + 1}`,
    })),
    rows: Array.from({ length: 100 }).map((_, i) => ({
        column1: `row ${i + 1}`,
        column2: `row ${i + 1}`,
        column3: `row ${i + 1}`,
        column4: `row ${i + 1}`,
        column5: `row ${i + 1}`,
        // column6: `row ${i + 1}`,
        // column7: `row ${i + 1}`,
        // column8: `row ${i + 1}`,
        // column9: `row ${i + 1}`,
        // column10: `row ${i + 1}`,
        // column11: `row ${i + 1}`,
        // column12: `row ${i + 1}`,
        // column13: `row ${i + 1}`,
        // column14: `row ${i + 1}`,
        // column15: `row ${i + 1}`,
        // column16: `row ${i + 1}`,
        // column17: `row ${i + 1}`,
        // column18: `row ${i + 1}`,
        // column19: `row ${i + 1}`,
        // column20: `row ${i + 1}`,
    })),
};

const gridData = {
    rows: [
        {
            id: "R|8",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "496.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|7",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "479.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|6",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "qqq",
            validadeDoReagenteSolucao: "2025-05-30",
            estoqueDoReagenteSolucao: "56.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|5",
            data: {
                error: "",
            },
            name: "Teste PA",
            reagenteSolucao: "Teste PA",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "0987654321",
            validadeDoReagenteSolucao: "2023-08-03",
            estoqueDoReagenteSolucao: "1364.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|21",
            data: {
                error: "",
            },
            name: "Teste PA",
            reagenteSolucao: "Teste PA",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "0987654321",
            validadeDoReagenteSolucao: "2023-08-03",
            estoqueDoReagenteSolucao: "1364.0000 mL",
            reagenteSolucaoEmUso: "Não",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|2",
            data: {
                error: "Unidade da solução diferente da configuração da variável",
            },
            name: "Agar",
            reagenteSolucao: "Agar",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "97897",
            validadeDoReagenteSolucao: "2024-01-26",
            estoqueDoReagenteSolucao: "1000.0000 g",
            reagenteSolucaoEmUso: "Não",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
        {
            id: "R|1",
            data: {
                error: "",
            },
            name: "Materail de consumo ",
            reagenteSolucao: "Materail de consumo ",
            tipoDeReagenteSolucao: "Reagente",
            classeDoReagenteSolucao: "Classe Teste",
            almoxarifado: "Almoxarifado",
            setores: "-",
            donoDoReagenteSolucao: "Não",
            reagenteSolucaoHabilitado: "Sim",
            loteDoReagenteSolucao: "123",
            validadeDoReagenteSolucao: null,
            estoqueDoReagenteSolucao: "495.0000 mL",
            reagenteSolucaoEmUso: "Sim",
            reagenteSolucaoConforme: "Sim",
            validacaoDoReagenteSolucao: "OK",
            analiseCriticaDoReagenteSolucao: "Desnecessário",
            statusDoReagenteSolucao: "OK",
        },
    ],
    columns: [
        {
            field: "Reagente/Solução",
            fieldName: "reagenteSolucao",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Tipo de Reagente/Solução",
            fieldName: "tipoDeReagenteSolucao",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Lote do Reagente/Solução",
            fieldName: "loteDoReagenteSolucao",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Validade do Reagente/Solução",
            fieldName: "validadeDoReagenteSolucao",
            type: "date",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },

        {
            field: "Análise Crítica do Reagente/Solução",
            fieldName: "analiseCriticaDoReagenteSolucao",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Reagente/Solução Conforme",
            fieldName: "reagenteSolucaoConforme",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Validação do Reagente/Solução",
            fieldName: "validacaoDoReagenteSolucao",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Reagente/Solução em Uso",
            fieldName: "reagenteSolucaoEmUso",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        // {
        //     field: "Dono do Reagente/Solução",
        //     fieldName: "donoDoReagenteSolucao",
        //     type: "text",
        //     styles: {
        //         minWidth: 200,
        //     },
        //     configs: {
        //         fixedLeft: false,
        //         cantSort: false,
        //         suffix: "",
        //     },
        // },
        // {
        //     field: "Reagente/Solução Habilitado",
        //     fieldName: "reagenteSolucaoHabilitado",
        //     type: "text",
        //     styles: {
        //         minWidth: 200,
        //     },
        //     configs: {
        //         fixedLeft: false,
        //         cantSort: false,
        //         suffix: "",
        //     },
        // },
        {
            field: "Classe do Reagente/Solução",
            fieldName: "classeDoReagenteSolucao",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Almoxarifado",
            fieldName: "almoxarifado",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Setor",
            fieldName: "setor",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
        {
            field: "Estoque do Reagente/Solução",
            fieldName: "estoqueDoReagenteSolucao",
            type: "text",
            styles: {
                minWidth: 200,
            },
            configs: {
                fixedLeft: false,
                cantSort: false,
                suffix: "",
            },
        },
    ],
};

interface IListingProps {
    childrenToolbar?: any;
}

interface IListingToolProps {
    open?: boolean;
    children?: ReactNode;
    hasPin: boolean;
    togglePin(): void;
}

interface IButtonActionProps {
    onClick(): void;
    active?: boolean;
    iconName: string;
}

const hasTablet = false;

const ButtonAction = ({
    iconName,
    onClick,
    active = false,
}: IButtonActionProps) => {
    return (
        <button
            className={joinClassName(
                "py-1",
                "px-3",
                "flex",
                "items-center",
                "rounded",
                "transition",
                "duration-300",
                "hover:bg-blue-900",
                "hover:text-white",
                "cursor-pointer",
                "justify-center",
                active ? "bg-blue-950 text-white" : "bg-slate-200"
            )}
            type="button"
            onClick={onClick}
        >
            <Icon iconName={iconName} size={15} />
        </button>
    );
};

const ListingTool = ({
    open,
    children,
    hasPin,
    togglePin,
}: IListingToolProps) => {
    const [showToolbar, setShowToolbar] = useState(false);
    const [openToolbar, setOpenToolbar] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(true);

    const [openToolbarItem, setOpenToolbarItem] = useState(false);
    const [hasPinTool, setPinTool] = useState(false);

    const refResize = useRef<any>(null);
    const refResizeLeft = useRef<any>(null);
    const refResizeRight = useRef<any>(null);

    const mouseMoveHandler = function (e: MouseEvent) {
        const dx = e.clientX - x;
        const dy = e.clientY - y;
        if (
            refResizeLeft.current &&
            refResize.current &&
            refResize.current.parentNode &&
            refResizeRight.current
        ) {
            const newLeftWidth =
                ((leftWidth + dx) * 100) /
                refResize.current.parentNode.getBoundingClientRect().width;
            if (refResizeLeft.current && refResize.current) {
                refResizeLeft.current.style.width = `${newLeftWidth}%`;
                refResize.current.style.cursor = "col-resize";
                refResizeLeft.current.style.userSelect = "none";
                refResizeLeft.current.style.pointerEvents = "none";
            }
            refResizeRight.current.style.userSelect = "none";
            refResizeRight.current.style.pointerEvents = "none";
        }
    };

    const mouseUpHandler = function () {
        if (
            refResizeLeft.current &&
            refResize.current &&
            refResizeRight.current
        ) {
            refResize.current.style.removeProperty("cursor");
            document.body.style.removeProperty("cursor");

            refResizeLeft.current.style.removeProperty("user-select");
            refResizeLeft.current.style.removeProperty("pointer-events");

            refResizeRight.current.style.removeProperty("user-select");
            refResizeRight.current.style.removeProperty("pointer-events");

            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        }
    };

    const mouseDownHandler = function (event: any) {
        x = event.clientX;
        y = event.clientY;
        if (refResizeLeft.current) {
            leftWidth = refResizeLeft.current.getBoundingClientRect().width;

            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
            document.body.style.cursor = "col-resize";
        }
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setLoadingScreen(false);
            }, 2000);
        }
    }, [open]);

    return (
        <div
            className={joinClassName(
                "flex",
                "gap-0.5",
                "mt-1",
                "h-full",
                "w-full"
            )}
        >
            <div
                ref={refResizeLeft}
                className="bg-slate-300 h-full w-full flex flex-col gap-1 overflow-hidden "
            >
                <div className="p-1 w-full h-12 flex gap-1 justify-end shadow">
                    <ButtonAction iconName="FiPlus" onClick={() => {}} />
                    <ButtonAction
                        active={hasPin}
                        iconName={
                            hasPinTool ? "AiFillPushpin" : "AiOutlinePushpin"
                        }
                        onClick={togglePin}
                    />
                    <ButtonAction
                        active={showToolbar}
                        iconName={
                            showToolbar ? "FiChevronRight" : "FiChevronLeft"
                        }
                        onClick={() => setShowToolbar(!showToolbar)}
                    />
                </div>
                <Grid loading={loadingScreen} {...gridData} />
            </div>
            <div
                ref={refResize}
                className={joinClassName(
                    hasPinTool ? "hidden" : "",
                    hasTablet
                        ? ""
                        : joinClassName(
                              "w-2",
                              "h-full",
                              "bg-slate-400",
                              "hover:bg-slate-500",
                              "duration-300",
                              "transition-width",
                              "rounded",
                              "hover:w-4",
                              "cursor-ew-resize"
                          ),
                    openToolbarItem ? "" : "hidden"
                )}
                onMouseDown={mouseDownHandler}
            ></div>
            <div
                ref={refResizeRight}
                className={joinClassName(
                    "flex",
                    "h-full",
                    "duration-300",
                    "ease-in-out",
                    "transition-width",
                    showToolbar
                        ? openToolbarItem
                            ? "w-20"
                            : "w-[5rem] flex-1"
                        : "w-0"
                )}
            >
                <div
                    className={joinClassName(
                        "flex",
                        "flex-col",
                        "h-full",
                        "gap-1"
                    )}
                >
                    <button
                        type="button"
                        className={joinClassName(
                            "p-2",
                            "w-full",
                            "max-h-10",
                            "gap-3",
                            "transition",
                            "duration-300",
                            "hover:bg-blue-900",
                            "h-full",
                            "bg-blue-950",
                            "rounded",
                            "text-white",
                            "items-center",
                            "justify-center",
                            openToolbarItem ? "flex" : "hidden",
                            hasTablet ? "" : "hidden"
                        )}
                        onMouseDown={mouseDownHandler}
                        onDoubleClick={() => {
                            if (refResizeLeft.current)
                                refResizeLeft.current.style.width = `${100}%`;
                        }}
                    >
                        <BiMoveHorizontal />
                    </button>
                </div>
                <div
                    className={joinClassName(
                        "h-full",
                        "bg-slate-300",
                        "flex",
                        "flex-1",
                        "duration-300",
                        "ease-in-out",
                        "transition-width",
                        openToolbarItem ? "w-20" : "w-0"
                    )}
                >
                    {openToolbarItem && children}
                </div>
            </div>
        </div>
    );
};

export function Listing({ childrenToolbar }: IListingProps) {
    const [isOpenPopover, setOpenPopover] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openToolbar, setOpenToolbar] = useState(false);
    const [openToolbarItem, setOpenToolbarItem] = useState(false);
    const [loadingTool, setLoadingTool] = useState(false);
    const [hasPin, setPin] = useState(false);
    const [moduleItems, setModuleItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [moduleActive, setModuleActive] = useState({
        title: "Home",
        icon: "FiHome",
    });
    const [menuActive, setMenuActive] = useState<any>({});
    const [anchorEl, setAnchorEl] = useState();
    const refPopover = useCallback((node: any) => {
        if (node) {
            setAnchorEl(node);
        }
    }, []);

    const { getData, isLoading } = useGet();

    const handlePinToolbar = () => {
        // if (refResizeLeft.current) refResizeLeft.current.style.width = `${0}%`;
        setPin(!hasPin);
    };

    const onCompleteMenu = useCallback((r: any) => {
        setMenuItems(r.data.main);
        setLoadingItems(false);
    }, []);

    const handleModule = useCallback(
        async (item: any) => {
            if (item.title !== moduleActive.title) {
                setLoadingItems(true);
            }
            await getData({
                path: `/api/safe/engine/menu?tagId=${item.tagId}`,
                onComplete: onCompleteMenu,
            });
            setModuleActive(item);
            setMenuActive({});
        },
        [getData, moduleActive.title, onCompleteMenu]
    );

    const onCompleteModule = useCallback((r: any) => {
        setModuleItems(r.data.main);
        setLoadingScreen(false);
    }, []);

    useEffect(() => {
        setLoadingScreen(true);
        getData({
            path: "/api/safe/engine/menu",
            onComplete: onCompleteModule,
        });
    }, []);

    useEffect(() => {
        if (openToolbarItem) {
            setTimeout(() => {
                setLoadingTool(false);
            }, 2000);
        }
    }, [openToolbarItem]);

    return (
        <div
            className={joinClassName(
                "bg-gray-300",
                "h-full",
                "w-full",
                "flex",
                "gap-1"
            )}
        >
            <Sidebar.Container
                direction="left"
                open={openSidebar}
                toggle={() => setOpenSidebar(!openSidebar)}
                disabled={hasPin}
            >
                <Sidebar.ContainerNav>
                    <Sidebar.ButtonMenu />
                    <Sidebar.Divider />
                    {loadingScreen && <Sidebar.LoadingItems />}
                    {moduleItems.map((mod, ind) => (
                        <Sidebar.ContainerExpandItem
                            key={ind}
                            items={menuItems}
                            onClick={(i) => setMenuActive(i)}
                            onOpen={() => handleModule(mod)}
                            item={mod}
                            subItem={menuActive}
                            id={String(ind)}
                            loading={loadingItems}
                        />
                    ))}

                    {/* <Sidebar.ButtonExpand id="menu" item={moduleActive} />
                    <Sidebar.ContainerExpand
                        id="menu"
                        items={moduleItems}
                        onClick={handleModule}
                        itemActive={moduleActive}
                    />
                    <Sidebar.Divider />
                    <Sidebar.ContainerButtons
                        items={menuItems}
                        onClick={(item) => {
                            setLoadingScreen(true);
                            setMenuActive(item);

                            setTimeout(() => {
                                setLoadingScreen(false);
                            }, 2000);
                        }}
                        loading={isLoading}
                    /> */}
                </Sidebar.ContainerNav>
                <Sidebar.ContainerNav fixed="bottom">
                    <Sidebar.Divider />
                    <Sidebar.ContainerButtons
                        items={[
                            {
                                title: "Suporte",
                                icon: "BiSupport",
                            },
                            { title: "Ajuda", icon: "FiHelpCircle" },
                        ]}
                        onClick={(item) => console.log(item)}
                    />
                    {/* <Sidebar.ButtonTheme
                        handleItem={(title) => console.log(title)}
                    /> */}
                    <Sidebar.ButtonUser
                        handleLogout={() => console.log("logout")}
                        handleUser={() => console.log("user")}
                    />
                </Sidebar.ContainerNav>
            </Sidebar.Container>

            <main
                className={joinClassName(
                    "h-full",
                    "flex",
                    "flex-1",
                    "flex-col",
                    "overflow-hidden"
                )}
            >
                <div
                    className={joinClassName(
                        "w-full",
                        "bg-gray-200",
                        "py-1",
                        "h-16",
                        "text-base",
                        "flex",
                        "items-center",
                        "justify-between",
                        "gap-2",
                        "rounded",
                        "text-base",
                        openSidebar ? "px-4" : "pl-2 pr-0.5"
                    )}
                >
                    <div className="w-full flex gap-2 items-center">
                        {menuActive?.title ? (
                            <>
                                <a href="" className="text-base">
                                    {moduleActive?.title}
                                </a>
                                <FiChevronRight />
                                {hasPin ? (
                                    <>
                                        <a href="" className="text-base">
                                            {menuActive?.title}
                                        </a>
                                        <FiChevronRight />
                                        <strong className="text-base">
                                            Filtros
                                        </strong>
                                    </>
                                ) : (
                                    <strong className="text-base">
                                        {menuActive?.title}
                                    </strong>
                                )}
                            </>
                        ) : (
                            <a href="">
                                <strong className="text-base">
                                    {moduleActive?.title}
                                </strong>
                            </a>
                        )}
                    </div>
                    <button
                        ref={refPopover}
                        type="button"
                        className={joinClassName(
                            "py-1",
                            "px-2",
                            "w-16",
                            "h-full",
                            "flex",
                            "items-center",
                            "rounded",
                            "transition",
                            "duration-300",
                            "hover:bg-slate-300",
                            "hover:ring-1",
                            "hover:ring-slate-500",
                            "cursor-pointer",
                            "text-base",
                            "justify-center"
                        )}
                        onClick={() => setOpenPopover(true)}
                    >
                        <Image
                            loader={() =>
                                "https://allims-files.s3.sa-east-1.amazonaws.com/front/allims_logo_color.png"
                            }
                            src="me.png"
                            alt="logomarca"
                            width={60}
                            height={65}
                        />
                    </button>
                    <Popover
                        anchorEl={anchorEl}
                        isOpen={isOpenPopover}
                        // onClose={() => setOpenPopover(false)}
                    >
                        <div className="w-10 h-10">Teste</div>
                    </Popover>
                </div>

                <Split.Container
                    open={openToolbarItem}
                    hasPin={hasPin}
                    hasCalc="58px"
                >
                    <Split.PanelLeft direction="col">
                        {menuActive.title ? (
                            <>
                                <div className="p-0.5 w-full h-24 flex gap-1 items-end flex-col">
                                    <span className="text-sm">Ações</span>
                                    <div className="p-0.5 w-full h-12 flex gap-1 justify-end">
                                        <ButtonAction
                                            iconName="FiPlus"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                        <ButtonAction
                                            iconName="FiRefreshCw"
                                            onClick={() => {}}
                                        />
                                    </div>
                                </div>
                                <Grid loading={loadingScreen} {...gridData} />
                            </>
                        ) : (
                            <Hello />
                        )}
                    </Split.PanelLeft>
                    <Split.PanelRight>
                        <div className="flex flex-col h-full gap-1">
                            <Sidebar.Container
                                direction="right"
                                open={openToolbar}
                                toggle={() => {
                                    setOpenToolbar(!openToolbar);
                                }}
                            >
                                <Sidebar.ContainerNav>
                                    <Sidebar.ButtonMenu />
                                    <Sidebar.Divider />
                                    <Sidebar.ContainerButtons
                                        items={[
                                            {
                                                title: "Filtros",
                                                icon: "FiFilter",
                                            },
                                            {
                                                title: "Detalhes",
                                                icon: "AiOutlineBars",
                                            },
                                        ]}
                                        onClick={(item) => {
                                            setLoadingTool(true);
                                            setOpenToolbarItem(
                                                !openToolbarItem
                                            );
                                        }}
                                        onDoubleClick={(item) => {
                                            console.log("double click");
                                            setPin(true);
                                        }}
                                    />
                                </Sidebar.ContainerNav>
                                <Sidebar.ContainerNav fixed="bottom">
                                    <Sidebar.Divider />
                                    <Sidebar.ContainerButtons
                                        items={[
                                            {
                                                title: "Suporte",
                                                icon: "BiSupport",
                                            },
                                            {
                                                title: "Ajuda",
                                                icon: "FiHelpCircle",
                                            },
                                        ]}
                                        onClick={(item) => console.log(item)}
                                    />
                                    {/* <Sidebar.ButtonTheme
                        handleItem={(title) => console.log(title)}
                    /> */}
                                    <Sidebar.ButtonUser
                                        handleLogout={() =>
                                            console.log("logout")
                                        }
                                        handleUser={() => console.log("user")}
                                    />
                                </Sidebar.ContainerNav>
                            </Sidebar.Container>
                            {/* <button
                                    type="button"
                                    className={joinClassName(
                                        "p-2",
                                        "w-full",
                                        "max-h-10",
                                        "gap-3",
                                        "transition",
                                        "duration-300",
                                        "hover:bg-blue-900",
                                        "h-full",
                                        "bg-blue-950",
                                        "rounded",
                                        "text-white",
                                        "items-center",
                                        "justify-center",
                                        openToolbarItem ? "flex" : "hidden",
                                        hasTablet ? "" : "hidden"
                                    )}
                                    onMouseDown={mouseDownHandler}
                                    onDoubleClick={() => {
                                        if (refResizeLeft.current)
                                            refResizeLeft.current.style.width = `${100}%`;
                                    }}
                                >
                                    <BiMoveHorizontal />
                                </button> */}
                        </div>
                        <div
                            className={joinClassName(
                                "h-full",
                                "bg-slate-300",
                                "flex",
                                "flex-1",
                                "duration-300",
                                "ease-in-out",
                                "transition-width",
                                openToolbarItem ? "w-80" : "w-0"
                            )}
                        >
                            <ListingTool
                                open={openToolbarItem}
                                hasPin={hasPin}
                                togglePin={() => handlePinToolbar()}
                            >
                                <Grid loading={loadingTool} {...gridData} />
                            </ListingTool>
                        </div>
                    </Split.PanelRight>
                </Split.Container>
                {/* <div
                    className={joinClassName(
                        "flex",
                        "gap-0.5",
                        "w-full",
                        "mt-1",
                        "h-[calc(100%-58px)]"
                    )}
                >
                    <div
                        ref={refResizeLeft}
                        className={joinClassName(
                            "bg-slate-300",
                            "h-full",
                            "flex",
                            "flex-col",
                            "gap-1",
                            "overflow-hidden",
                            hasPin ? "w-auto z-0" : "w-full"
                        )}
                    >
                        <div className="px-1 w-full h-12 flex gap-1 justify-end">
                            <ButtonAction Icon={FiPlus} onClick={() => {}} />
                            <ButtonAction
                                Icon={FiRefreshCw}
                                onClick={() => {}}
                            />
                        </div>
                        <Grid {...gridData} />
                    </div>
                    <div
                        ref={refResize}
                        className={joinClassName(
                            hasPin ? "hidden" : "",
                            hasTablet
                                ? ""
                                : joinClassName(
                                      "w-2",
                                      "h-full",
                                      "bg-slate-400",
                                      "hover:bg-slate-500",
                                      "duration-300",
                                      "transition-width",
                                      "rounded",
                                      "hover:w-4",
                                      "cursor-ew-resize"
                                  ),
                            openToolbarItem ? "" : "hidden",
                            "duration-300",
                            "ease-in-out",
                            "transition-width"
                        )}
                        onMouseDown={mouseDownHandler}
                    ></div>
                    <div
                        ref={refResizeRight}
                        className={joinClassName(
                            "flex",
                            "h-full",
                            "flex-1",
                            "duration-300",
                            "ease-in-out",
                            "transition-width",
                            hasPin ? "w-full" : "w-auto"
                        )}
                    >
                        <div className="flex flex-col h-full gap-1">
                            <Sidebar.Container
                                direction="right"
                                open={openToolbar}
                                toggle={() => {
                                    if (openToolbarItem) {
                                        if (refResizeLeft.current)
                                            refResizeLeft.current.style.width = `${100}%`;
                                    }
                                    setOpenToolbar(!openToolbar);
                                }}
                            >
                                <Sidebar.ContainerNav>
                                    <Sidebar.ButtonMenu />
                                    <Sidebar.Divider />
                                    <Sidebar.ContainerButtons
                                        items={[
                                            {
                                                title: "Filtros",
                                                Icon: FiFilter,
                                            },
                                            {
                                                title: "Detalhes",
                                                Icon: AiOutlineBars,
                                            },
                                        ]}
                                        onClick={(item) => {
                                            setOpenToolbarItem(
                                                !openToolbarItem
                                            );
                                        }}
                                    />
                                </Sidebar.ContainerNav>
                            </Sidebar.Container>
                            <button
                                type="button"
                                className={joinClassName(
                                    "p-2",
                                    "w-full",
                                    "max-h-10",
                                    "gap-3",
                                    "transition",
                                    "duration-300",
                                    "hover:bg-blue-900",
                                    "h-full",
                                    "bg-blue-950",
                                    "rounded",
                                    "text-white",
                                    "items-center",
                                    "justify-center",
                                    openToolbarItem ? "flex" : "hidden",
                                    hasTablet ? "" : "hidden"
                                )}
                                onMouseDown={mouseDownHandler}
                                onDoubleClick={() => {
                                    if (refResizeLeft.current)
                                        refResizeLeft.current.style.width = `${100}%`;
                                }}
                            >
                                <BiMoveHorizontal />
                            </button>
                        </div>
                        <div
                            className={joinClassName(
                                "h-full",
                                "bg-slate-300",
                                "flex",
                                "flex-1",
                                "duration-300",
                                "ease-in-out",
                                "transition-width",
                                openToolbarItem ? "w-80" : "w-0"
                            )}
                        >
                            <ListingTool
                                open={openToolbarItem}
                                hasPin={hasPin}
                                togglePin={handlePinToolbar}
                            >
                                 <ListingTool
                                    hasPin={false}
                                    togglePin={function (): void {}}
                                />
                                <Form />
                            </ListingTool>
                        </div>
                    </div>
                </div> */}
            </main>
        </div>
    );
}
