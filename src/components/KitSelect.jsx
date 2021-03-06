import React from "react";
import { connect } from "react-redux";
import { Dropdown } from 'react-bootstrap';
import { images } from '../assets'; 
import "./style.css";

import { kitsActions, loginActions } from "../actions"

const COLORS = ["Preto","Azul","Marrom","Verde","Cinza","Laranja","Rosa","Roxo","Vermelho","Branco","Amarelo"];

class KitSelectPure extends React.Component {

  componentDidMount() {
    this.props.getUser();
  }

  setReference = (which, ref) => {
    if (ref && this.props[which]["element"] === undefined) {
      this.props.setRef(which, ref);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit({
      calca: this.props.calca,
      camisa: this.props.camisa,
      sapato: this.props.sapato,
      gender: this.props.gender
    }, this.props.user.phone)
  }

  render() {
    return (
      <div className="container" style={{maxWidth: 800}}>
        <h2 className="text-center">Selecionar Kit</h2>
        <div align="center">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.props.gender ? " " + this.props.gender : " Masculino")} id="dropdown-gender">
              {this.props.gender ? this.props.gender : "Masculino" }
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { this.props.setGender("Masculino") }}>Masculino</Dropdown.Item>
              <Dropdown.Item onClick={() => { this.props.setGender("Feminino") }}>Feminino</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-sm">
            <div className="table">
              <div className="row justify-content-center frame">
                <img
                  ref={input => this.setReference("camisa", input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.props.selectType("camisa");
                    this.props.camisa["element"].focus();
                  }}
                  className="kit-image"
                  src={images["shirt" + (this.props.camisa["color"] ? this.props.camisa["color"] : "Branco")]}
                  alt={"Camisa"}
                />
              </div>
              <div className="row justify-content-center">
                <img
                  ref={input => this.setReference("calca", input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.props.calca["element"].focus();
                    this.props.selectType("calca");
                  }}
                  className="kit-image"
                  src={images["pants" + (this.props.calca["color"] ? this.props.calca["color"] : "Branco")]}
                  alt={"Calça"}
                />
              </div>
              <div className="row justify-content-center">
                <img
                  ref={input => this.setReference("sapato", input)}
                  tabIndex="-1"
                  onClick={e => {
                    e.preventDefault();
                    this.props.sapato["element"].focus();
                    this.props.selectType("sapato");
                  }}
                  className="kit-image"
                  src={images["shoes" + (this.props.sapato["color"] ? this.props.sapato["color"] : "Branco")]}
                  alt={"Calçado"}
                />
              </div>
            </div>
          </div>
          <div className="col-sm">
            {this.props.camisa.isSelected && (
              <div align="center" className="container">
                <h5 className="mb-4">Camisa</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.props.camisa["color"] ? " " + this.props.camisa["color"] : " Branco")} id="dropdown-color">
                    {this.props.camisa["color"] ? this.props.camisa["color"] : "Branco" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {COLORS.map((color, i) => <Dropdown.Item key={i} className={color} onClick={() => {
                        this.props.setColor(color, "camisa")
                      }}>{color}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {this.props.calca.isSelected && (
              <div align="center" className="container">
                <h5 className="mb-4">Calça</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.props.calca["color"] ? " " + this.props.calca["color"] : " Branco")} id="dropdown-color">
                    {this.props.calca["color"] ? this.props.calca["color"] : "Branco" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {COLORS.map((color, i) => <Dropdown.Item key={i} className={color} onClick={() => {
                        this.props.setColor(color, "calca")
                      }}>{color}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {this.props.sapato.isSelected && (
              <div align="center" className="container">
                <h5 className="mb-4">Calçado</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" className={"mb-4" + (this.props.sapato["color"] ? " " + this.props.sapato["color"] : " Branco")} id="dropdown-color">
                    {this.props.sapato["color"] ? this.props.sapato["color"] : "Branco" }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {COLORS.map((color, i) => <Dropdown.Item key={i} className={color} onClick={() => {
                        this.props.setColor(color, "sapato")
                      }}>{color}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            <div align="center" className="container">
              <button className="btn btn-primary" onClick={this.handleSubmit}>Enviar</button>
            </div>
            {this.props.submitMessage && <pre className="text-success text-center m-2">{this.props.submitMessage}</pre>}
          </div>
        </div>
      </div>
    );
  }
}

export const KitSelect = connect(
  state => { return { ...state.auth, ...state.kits } },
  { ...kitsActions, ...loginActions } // map dispatch to all these actions
)(KitSelectPure);
