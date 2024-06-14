import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import classNames from "classnames";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { lotDropdown, unitDropdown } from "./dropDown";
import React from "react";

const ManageLotModal = ({ show, setShow, handleToggle }) => {
  const methods = useFormContext();
  const { register, control, watch, setValue } = methods;

  const {
    fields: selectLotProduct,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `selectedProducts[${show?.productIndex}].selectedLotProducts`,
  });
  const selectedProducts = watch("selectedProducts");
  const selectedLotProducts = show?.product?.selectedLotProducts;
  console.log(selectedLotProducts);
  const productLots = lotDropdown?.filter(
    (item) => item.product === show.productId
  );

  const findUnits = (unitDropdown, lot, lotDropdown) => {
    let units = [];
    console.log(unitDropdown, lot, lotDropdown);
    lotDropdown.forEach((lot) => {
      if (lot.value === lot.value) {
        units = unitDropdown
          .filter((unitItem) =>
            Object.keys(lot.purchasePrice || {}).includes(unitItem.value)
          )
          .map((unitItem) => ({
            value: unitItem.value,
            label: unitItem.label,
          }));
      }
    });
    console.log("units:", units);
    return units;
  };

  const handleSelectLot = (e, lot) => {
    const { checked } = e.target;
    if (checked) {
      const alreadyChecked = selectLotProduct?.findIndex(
        (lotField) => lotField.value === lot.value
      );
      const lotUnits = findUnits(unitDropdown, lot, productLots);
      console.log(lotUnits);
      if (alreadyChecked === -1) {
        append({ ...lot, lotUnits, checked });
      }
    } else {
      const findLotIndex = selectLotProduct?.findIndex(
        (item) => item.value === lot.value
      );
      if (findLotIndex !== -1) {
        remove(findLotIndex);
      }
    }
  };

  return (
    <Card className={classNames("", { "d-none": !show })}>
      <Card.Body>
        <Modal
          show={show}
          onHide={handleToggle}
          backdrop="static"
          keyboard={false}
          size="md"
        >
          <Modal.Header onHide={handleToggle} closeButton>
            <Modal.Title>{"Manage Lots"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="lotManageForm" noValidate>
              {productLots?.map((item, index) => {
                const fieldName = `selectedProducts[${show?.productIndex}].selectedLotProducts`;

                return (
                  <Table
                    key={index}
                    className="align-middle"
                    size="sm"
                    bordered
                  >
                    <thead className="table-light">
                      <tr>
                        <th className="text-center bg-dark-subtle" colSpan={3}>
                          <div key={item.value}>
                            {/* <Controller
                              control={control}
                              // name={`selectedLots[${index}]`}
                              render={({ field }) => (
                                <>
                                  <input
                                    {...field}
                                    id={item.id}
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={field.value || false}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.checked && item.id
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor={item.id}
                                  >
                                    {item.label}
                                  </label>
                                </>
                              )}
                            /> */}
                            <Controller
                              control={control}
                              name={fieldName}
                              render={({ field }) => (
                                <>
                                  <input
                                    id={item.id}
                                    type="checkbox"
                                    className="form-check-input"
                                    // checked={field.value?.checked || false}
                                    onChange={(e) => {
                                      // field.onChange(e.target.checked);
                                      handleSelectLot(e, item);
                                    }}
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor={item.id}
                                  >
                                    {item.label}
                                  </label>
                                </>
                              )}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="text-center bg-light">{"Unit"}</th>
                        <th className="text-center bg-light">{"Quantity"}</th>
                        <th className="text-center bg-light">
                          {"Purchase price"}
                        </th>
                      </tr>
                      {show?.product?.selectedUnit?.map((unit, unitIndex) => {
                        if (
                          unit?.checked &&
                          selectedProducts?.[`${show?.productIndex}`]
                            ?.selectedLotProducts?.[`${index}`]?.checked
                        ) {
                          return (
                            <>
                              <tr key={`${unitIndex}`} className="text-center">
                                <td>{unit.label}</td>
                                <td>
                                  <input
                                    type="number"
                                    required={false}
                                    className={"mt-1"}
                                    // name={`selectedProducts[${show?.productIndex}].selectedLotProducts[${index}].lotUnits[${unitIndex}].qty`}
                                    {...register(
                                      `selectedProducts[${show?.productIndex}].selectedLotProducts[${index}].lotUnits[${unitIndex}].qty`
                                    )}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    required={false}
                                    className={"mt-1"}
                                    {...register(
                                      `selectedProducts[${show?.productIndex}].selectedLotProducts[${index}].lotUnits[${unitIndex}].price`
                                    )}
                                  />
                                </td>
                              </tr>
                            </>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                );
              })}

              <div className="mt-5 text-end">
                <Button type="submit" variant="primary">
                  {"Manage Lot"}
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default ManageLotModal;
