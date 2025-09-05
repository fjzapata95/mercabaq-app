export async function validateForm(object: { [x: string]: any; }, validationRules: { [x: string]: any; }) {
    const newErrorText: any = {};
    let valid = true;

    for (const property in object) {
        newErrorText[property] = '';
        const rules = validationRules[property];
        let errorFound = false;
        for (const rule in rules) {
            if (errorFound === true) {
                break;
            }
            let aux = rules[rule];
            if (rule === 'required' && typeof rules[rule] === 'object') {
                const aaa = Object.keys(rules[rule])[0];
                const www = object[aaa] === rules[rule][aaa];
                aux = www;
            }
            const value = typeof object[property] === 'string' ? object[property].trim() : object[property];
            switch (rule) {
                case 'required':
                    if (aux === true) {
                        if (value === '' || value === null || value === undefined || value.length === 0) {
                            newErrorText[property] = 'Este campo es obligatorio';
                            errorFound = true;
                            valid = false;
                        }
                    }
                    break;
                case 'email':
                    if (rules[rule] === true && value !== '' && value !== null && value.length !== 0) {
                        const regex1 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        if (!regex1.test(value)) {
                            newErrorText[property] = 'Por favor, escribe un correo electrónico válido';
                            errorFound = true;
                            valid = false;
                        }
                    }
                    break;
                case 'url':
                    if (rules[rule] === true && value !== '' && value !== null && value.length !== 0) {
                        const regex2 = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

                        if (!regex2.test(value)) {
                            newErrorText[property] = 'Por favor, escribe una URL válida';
                            errorFound = true;
                            valid = false;
                        }
                    }
                    break;
                case 'digits':
                    if (rules[rule] === true && value !== '' && value !== null && value.length !== 0) {
                        const regex3 = /^\d+$/;

                        if (!regex3.test(value)) {
                            newErrorText[property] = 'Por favor, escribe sólo dígitos';
                            errorFound = true;
                            valid = false;
                        }
                    }
                    break;
                case 'min':
                    if (rules[rule] >= value) {
                        newErrorText[property] = 'Por favor, escribe un valor mayor o igual a ' + rules[rule] + '.';
                        errorFound = true;
                        valid = false;
                    }
                    break;
                case 'max':
                    if (rules[rule] <= value) {
                        newErrorText[property] = 'Por favor, escribe un valor menor o igual a ' + rules[rule] + '.';
                        errorFound = true;
                        valid = false;
                    }
                    break;
                case 'minLength':
                    if (value !== '' && value !== null && value.length !== 0) {
                        if (value.length < rules[rule]) {
                            newErrorText[property] = 'Por favor, no escribas menos de ' + rules[rule] + ' caracteres';
                            errorFound = true;
                            valid = false;
                        }
                    }
                    break;
                case 'maxLength':
                    if (value !== '' && value !== null && value.length !== 0) {
                        if (value.length > rules[rule]) {
                            newErrorText[property] = 'Por favor, no escribas más de ' + rules[rule] + ' caracteres';
                            errorFound = true;
                            valid = false;
                        }
                    }
                    break;
                case 'equalTo':
                    if (value !== object[rules[rule]]) {
                        newErrorText[property] = 'Por favor, escribe el mismo valor de nuevo';
                        errorFound = true;
                        valid = false;
                    }
                    break;
                case 'regex':
                    if (rules[rule] && value !== '' && value !== null && value.length !== 0) {
                        let regex4 = null;

                        if (typeof rules[rule] === 'object') {
                            regex4 = rules[rule];
                        } else {
                            regex4 = new RegExp(rules[rule]);
                        }

                        if (!regex4.test(value)) {
                            newErrorText[property] = 'Por favor, digita un valor válido';
                            errorFound = true;
                            valid = false;
                        }
                    }
                    break;
                default:
                    newErrorText[property] = '';
                    break;
            }
        }
    }

    const rsp = {
        valid,
        newErrorText
    };

    return rsp;
}

export function validateField(field: any, validationRules: any) {
    let newErrorText = '';
    let valid = true;
    let errorFound = false;
    const newField = typeof field === 'string' ? field.trim() : field;
  
    for (const rule in validationRules) {
      if (errorFound === true) {
        break;
      }
  
      const aux = validationRules[rule];
  
      switch (rule) {
        case 'required':
          if (aux === true) {
            if (newField === '' || newField === null || newField.length === 0) {
              newErrorText = 'Este campo es obligatorio';
              errorFound = true;
              valid = false;
            }
          }
          break;
        case 'email':
          if (validationRules[rule] === true && newField !== '' && newField !== null && newField.length !== 0) {
            const regex1 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
            if (!regex1.test(newField)) {
              newErrorText = 'Por favor, escribe un correo electrónico válido';
              errorFound = true;
              valid = false;
            }
          }
          break;
        case 'url':
          if (validationRules[rule] === true && newField !== '' && newField !== null && newField.length !== 0) {
            const regex2 = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  
            if (!regex2.test(newField)) {
              newErrorText = 'Por favor, escribe una URL válida';
              errorFound = true;
              valid = false;
            }
          }
          break;
        case 'digits':
          if (validationRules[rule] === true && newField !== '' && newField !== null && newField.length !== 0) {
            const regex3 = /^\d+$/;
  
            if (!regex3.test(newField)) {
              newErrorText = 'Por favor, escribe sólo dígitos';
              errorFound = true;
              valid = false;
            }
          }
          break;
        case 'min':
          if (validationRules[rule] >= newField) {
            newErrorText = 'Por favor, escribe un valor mayor o igual a ' + validationRules[rule] + '.';
            errorFound = true;
            valid = false;
          }
          break;
        case 'max':
          if (validationRules[rule] <= newField) {
            newErrorText = 'Por favor, escribe un valor menor o igual a ' + validationRules[rule] + '.';
            errorFound = true;
            valid = false;
          }
          break;
        case 'minLength':
          if (newField !== '' && newField !== null && newField.length !== 0) {
            if (newField.length < validationRules[rule]) {
              newErrorText = 'Por favor, no escribas menos de ' + validationRules[rule] + ' caracteres';
              errorFound = true;
              valid = false;
            }
          }
          break;
        case 'maxLength':
          if (newField !== '' && newField !== null && newField.length !== 0) {
            if (newField.length > validationRules[rule]) {
              newErrorText = 'Por favor, no escribas más de ' + validationRules[rule] + ' caracteres';
              errorFound = true;
              valid = false;
            }
          }
          break;
        case 'maxWidgets':
          if (newField !== '' && newField !== null && newField.length > aux) {
            newErrorText = 'Por favor, no añadas más de ' + validationRules[rule] + ' canales';
            errorFound = true;
            valid = false;
          }
          break;
        case 'regex':
          if (validationRules[rule] && newField !== '' && newField !== null && newField.length !== 0) {
            let regex4 = null;
  
            if (typeof validationRules[rule] === 'object') {
              regex4 = validationRules[rule];
            } else {
              regex4 = new RegExp(validationRules[rule]);
            }
  
            if (!regex4.test(newField)) {
              newErrorText = 'Por favor, digita un valor válido';
              errorFound = true;
              valid = false;
            }
          }
          break;
        case 'array':
          if (validationRules[rule] === true) {
            console.log(newField);
          }
          break;
        default:
          break;
      }
    }
  
    const rsp = {
      valid,
      newErrorText
    };
  
    return rsp;
}