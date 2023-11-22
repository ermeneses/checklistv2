import { Interface } from "readline";
import { EQUIPOSS } from "../../utils/misConstantes";
import React from "react";

const todosLosEquipos: IEQUIPO[] = EQUIPOSS;

interface IEQUIPO {
  destino: string;
  seccion: string;
  subseccion: string;
  marca: string;
  id: string;
  id_equipo_principal: string;
  equipo: string;
  serie: string;
  id_destino: string;
  id_seccion: string;
  id_subseccion: string;
  id_tipo: string;
  id_ccoste: string;
  id_hotel: string;
  id_area: string;
  id_localizacion: string;
  id_ubicacion: string;
  id_sububicacion: string;
  categoria: string;
  local_equipo: string;
  jerarquia: string;
  id_marca: string;
  modelo: string;
  numero_serie: string;
  codigo_fabricante: string;
  potencia_electrica_hp: string;
  potencia_electrica_kw: string;
  voltaje_v: string;
  caudal_agua_m3h: string;
  carga_mca: string;
  potencia_energetica_frio_kw: string;
  potencia_energetica_frio_tr: string;
  potencia_energetica_calor_kcal: string;
  caudal_aire_m3h: string;
  caudal_aire_cfm: string;
  capacidad: string;
}

const Equipos = () => {
  const equiposPrincipales = todosLosEquipos.filter(
    (equipo) => equipo.id_equipo_principal === "0"
  );

  return (
    <div>
      Equipos
      <table className="table-auto">
        <thead>
          <tr>
            <th>DESCRIPCION</th>
            <th>COD_EQUIPO</th>
            <th>EQUIPO_SUP</th>
            <th>UBICACIÓN</th>
            <th>NO_PDS</th>
            <th>COD_UBICACIÓN</th>
            <th>COD_FAMILIA</th>
            <th>SERVICIO</th>
            <th>FAMILIA</th>
            <th>COD_SERV</th>
            <th>COD_ESTADO</th>
            <th>LOCALIZACION</th>
            <th>COD_CRITICIDAD</th>
            <th>DEPARTAMENTO</th>
            <th>COD_PROVEEDOR</th>
            <th>COD_FABRICANTE</th>
            <th>COD_CUENTA_CONT</th>
            <th>FECHA_INI</th>
            <th>FECHA_FIN</th>
            <th>DETALLE</th>
            <th>FECHA_ADQUISICIÓN</th>
            <th>VALOR_INMOVILIZADO</th>
            <th>TIEMPO_AMORT</th>
            <th>COSTE_PARO</th>
            <th>NUM_ELEMENTOS</th>
            <th>MODELO</th>
            <th>NUM_INVENTARIO</th>
            <th>COD_CONTRATO</th>
            <th>X_SAP_ACTIVO</th>
            <th>X_SISTEMA</th>
            <th>X_MARCA</th>
            <th>X_SN</th>
            <th>X_TIPO_EQUIPO</th>
            <th>X_POTENCIA</th>
            <th>X_ID INTERNA</th>
            <th>0_SISTEMA_N1</th>
            <th>0_COD_DESCRIP</th>
            <th>0_DESCRIPCIÓN EQUIPO</th>
            <th>0_COD_DESCIP_NOM</th>
            <th>0_COD_DESCRIP_NUM</th>
            <th>0_X_SUBEQUIPO</th>
            <th>0_COD_SUBEQUIPO</th>
            <th>0_COD_HOTEL</th>
            <th>PRIN-SECU</th>
          </tr>
        </thead>
        <tbody>
          {equiposPrincipales.map((equipoPrincipal) => (
            <React.Fragment key={equipoPrincipal.id}>
              <tr>
                <td>-a-</td>
                <td>-a-</td>
                <td>-a-</td>
                <td>0</td>
                <td>0</td>
                <td>XXXX</td>
                <td>XXXX</td>
                <td>1</td>
                <td>0</td>
                <td>XNONEX</td>
                <td>SERV</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>
                  {equipoPrincipal.codigo_fabricante
                    ? equipoPrincipal.codigo_fabricante
                    : ""}
                </td>
                <td>PFHG/622000001</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>{equipoPrincipal.modelo ? equipoPrincipal.modelo : ""}</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>XNONEX</td>
                <td>
                  {equipoPrincipal.seccion}-{equipoPrincipal.subseccion}
                </td>
                <td>{equipoPrincipal.marca ? equipoPrincipal.marca : ""}</td>
                <td>
                  {equipoPrincipal.numero_serie
                    ? equipoPrincipal.numero_serie
                    : ""}
                </td>
                <td>{equipoPrincipal.id_tipo}</td>
                <td>XNONEX</td>
                <td>
                  {equipoPrincipal.equipo} ID:{equipoPrincipal.id}
                </td>
                <td>-a-</td>
                <td>-a-</td>
                <td>{equipoPrincipal.id_tipo}</td>
                <td>-a-</td>
                <td>INCREMENTAL</td>
                <td>-a-</td>
                <td></td>
                <td>-a-</td>
                <td>PRINCIPAL</td>
              </tr>
              {todosLosEquipos
                .filter(
                  (equipo) => equipo.id_equipo_principal === equipoPrincipal.id
                )
                .map((equipoSecundario) => (
                  <tr key={equipoSecundario.id}>
                    <td>-a-</td>
                    <td>-a-</td>
                    <td>-a-</td>
                    <td>0</td>
                    <td>0</td>
                    <td>XXXX</td>
                    <td>XXXX</td>
                    <td>1</td>
                    <td>0</td>
                    <td>XNONEX</td>
                    <td>SERV</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>
                      {equipoSecundario.codigo_fabricante
                        ? equipoSecundario.codigo_fabricante
                        : ""}
                    </td>
                    <td>PFHG/622000001</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>
                      {equipoSecundario.modelo ? equipoSecundario.modelo : ""}
                    </td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>XNONEX</td>
                    <td>
                      {equipoSecundario.seccion}-{equipoSecundario.subseccion}
                    </td>
                    <td>
                      {equipoSecundario.marca ? equipoSecundario.marca : ""}
                    </td>
                    <td>
                      {equipoSecundario.numero_serie
                        ? equipoSecundario.numero_serie
                        : ""}
                    </td>
                    <td>{equipoSecundario.id_tipo}</td>
                    <td>XNONEX</td>
                    <td>
                      {equipoSecundario.equipo} ID:{equipoSecundario.id}
                    </td>
                    <td>-a-</td>
                    <td>-a-</td>
                    <td>{equipoSecundario.id_tipo}</td>
                    <td>-a-</td>
                    <td>INCREMENTAL</td>
                    <td>-a-</td>
                    <td></td>
                    <td>-a-</td>
                    <td>SECUNDARIO</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
          {/* <tr>
            <th>COD_EQUIPO</th>
            <td>EQUIPO</td>
            <td>COD_FAMILIA</td>
            <td>EQUIPO_SUP</td>
            <td>COD_SERV</td>
            <td>COD_ESTADO</td>
            <td>SERVICIO</td>
            <td>LOCALIZACION</td>
            <td>COD_CRITICIDAD</td>
            <td>DEPARTAMENTO</td>
            <td>COD_UBICACIÓN</td>
            <td>UBICACIÓN</td>
            <td>NO_PDS</td>
            <td>COD_PROVEEDOR</td>
            <td>COD_FABRICANTE</td>
            <td>COD_CUENTA_CONT</td>
            <td>FECHA_INI</td>
            <td>FECHA_FIN</td>
            <td>DETALLE</td>
            <td>FECHA_ADQUISICIÓN</td>
            <td>VALOR_INMOVILIZADO</td>
            <td>TIEMPO_AMORT</td>
            <td>COSTE_PARO</td>
            <td>NUM_ELEMENTOS</td>
            <td>MODELO</td>
            <td>NUM_INVENTARIO</td>
            <td>COD_CONTRATO</td>
            <td>X_SAP_ACTIVO</td>
            <td>X_SISTEMA</td>
            <td>X_MARCA</td>
            <td>X_SN</td>
            <td>X_POTENCIA</td>
            <td>X_ID_INTERNA</td>
            <td>X_SUBEQUIPO</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Equipos;
