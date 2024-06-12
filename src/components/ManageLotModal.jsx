import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import classNames from "classnames";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const ManageLotModal = ({
  show,
  setShow,
  handleToggle,
  lots,
  watchProduct,
}) => {
  console.log(watchProduct);
  const methods = useFormContext();
  const { register } = methods;

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
              {lots?.map((item, index) => {
                return (
                  <Table
                    key={index}
                    className="align-middle"
                    size="sm"
                    bordered
                  >
                    <thead className="table-light">
                      <tr>
                        <th className="text-center" colSpan={2}>
                          <div className="d-flex justify-content-center align-items-center">
                            <Form.Check
                              type={"checkbox"}
                              required={false}
                              className={""}
                              placeholder={""}
                              label={`${item?.label}`}
                              name={`product.lotProducts.${index}.isSelected`}
                              {...register(
                                `product.lotProducts.${index}.isSelected`
                              )}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchProduct?.lotProducts?.map(
                        (item, index) => console.log(item,index)
                          // item?.isSelected && (
                          //   <>
                          //     <Table className="align-middle" size="sm" key={index}>
                          //       <thead className="text-dark">
                          //         <tr>
                          //           <th className="text-center">{"Unit"}</th>
                          //           <th className="text-center">
                          //             {"Quantity"}
                          //           </th>
                          //           <th className="text-center">
                          //             {"Purchase price"}
                          //           </th>
                          //         </tr>
                          //       </thead>
                          //       {/* <tbody>
                          //         {watchProduct?.unit?.map(
                          //           (item, index) =>
                          //             item.selected && (
                          //               <>
                          //                 <tr key={index}>
                          //                   <td> {item?.label}</td>
                          //                   <td>
                          //                     <input
                          //                       type="number"
                          //                       required={false}
                          //                       className={"mt-1"}
                          //                     />
                          //                   </td>
                          //                   <td>
                          //                     <input
                          //                       type="number"
                          //                       required={false}
                          //                       className={"mt-1"}
                          //                     />
                          //                   </td>
                          //                 </tr>
                          //               </>
                          //             )
                          //         )}
                          //       </tbody> */}
                          //     </Table>
                          //   </>
                          // )
                      )}
                    </tbody>
                  </Table>
                );
              })}

              <div className="mt-5 text-end">
                <Button type="submit" variant="primary">
                  {"submit"}
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
